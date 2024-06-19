var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../db');
const createError = require('http-errors');

//get all friends of the logged in person
router.get(
  '/friends',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const friends = await db.query(
      `SELECT friends.from_user, friends.to_user, name AS friend_name 
      FROM friends
      LEFT JOIN users ON friends.to_user = users.id 
      WHERE from_user=$1`,
      [myId]
    );
    res.json(friends.rows);
  })
);

//get all friend request that were sent to you
router.get(
  '/friend_requests/inbox/GET',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const friendRequests = await db.query(
      `
    SELECT users.name, friend_requests.sender_id
    FROM friend_requests
    INNER JOIN users ON friend_requests.sender_id = users.id
    WHERE receiver_id=$1`,
      [myId]
    );
    res.json(friendRequests.rows);
  })
);

//get all friend requests you send to others
router.get(
  '/friend_requests/inbox/SENT',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const friendRequests = await db.query(
      `
    SELECT users.name
    FROM friend_requests
    INNER JOIN users ON friend_requests.receiver_id = users.id
    WHERE sender_id=$1`,
      [myId]
    );
    res.json(friendRequests.rows);
  })
);

//send friend request to a target
router.post(
  '/friend_requests/inbox/SEND/:targetName',
  asyncHandler(async (req, res, next) => {
    const targetName = req.params.targetName;
    const myId = req.user.id;
    const target = await db.query(`SELECT id FROM users WHERE name=$1`, [
      targetName,
    ]);
    if (target.rowCount === 0) {
      return res.status(404).json('User not found');
    }
    const targetId = target.rows[0].id;
    const alreadyFriend = await db.query(
      `SELECT * FROM friends WHERE from_user=$1 AND to_user=$2`,
      [myId, targetId]
    );
    if (alreadyFriend.rows.length > 0) {
      return res.status(404).json('Failed request, already friends');
    }
    await db.query(
      `INSERT INTO friend_requests (sender_id, receiver_id) VALUES( $1, $2)`,
      [myId, targetId]
    );
    res.json('Friend request sent Successfully');
  })
);

//accept a friend request
router.post(
  '/friend_requests/inbox/ACCEPT/:targetId',
  asyncHandler(async (req, res, next) => {
    const friendId = req.params.targetId;
    const myId = req.user.id;
    await db.query(
      'INSERT INTO friends (from_user, to_user) VALUES($1, $2), ($2,$1)',
      [myId, friendId]
    );
    //once adding to friends is successfuly, delete the friend request
    await db.query(
      `
          DELETE FROM friend_requests 
          WHERE receiver_id=$1 AND sender_id=$2
          `,
      [myId, friendId]
    );
    res.json('Success');
  })
);
//Get chat log
router.get(
  '/:targetId/chat',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const chatLog = await db.query(
      `SELECT 
        posts.content, 
        posts.postedTime, 
        users_postedBy.name AS postedByName, 
        users_postedTo.name AS postedToName 
      FROM 
        posts 
      INNER JOIN 
        users AS users_postedBy 
      ON 
        posts.postedBy = users_postedBy.id
      INNER JOIN 
        users AS users_postedTo 
      ON 
        posts.postedTo = users_postedTo.id
      WHERE
        (posts.postedBy = $1 AND posts.postedTo = $2)  -- Filter for messages between users 1 and 3
        OR
        (posts.postedBy = $2 AND posts.postedTo = $1) -- Include messages in the opposite 
      ORDER BY 
        postedTime;
    `,
      [myId, req.params.targetId]
    );
    res.json(chatLog.rows);
  })
);

//Sends a message to the receiver
router.post(
  '/:targetId/chat',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const content = req.body.content;
    const targetId = req.params.targetId;
    const time = new Date();
    await db.query(
      'INSERT INTO posts (content, postedBy, postedTo, postedTime) VALUES ($1,$2,$3,$4)',
      [content, myId, targetId, time]
    );
    res.json('Posted Successfully');
  })
);

//create new group
router.post(
  '/group/create',
  asyncHandler(async (req, res, next) => {
    const groupName = req.body.groupName;
    const groupCreationResponse = await db.query(
      `INSERT INTO groups (name) VALUES ($1) RETURNING id`,
      [groupName]
    );
    const groupId = groupCreationResponse.rows[0].id;
    const myId = req.user.id;
    await db.query(
      `INSERT INTO usersXgroups (user_id, group_id) VALUES ($1, $2)`,
      [myId, groupId]
    );
    res.json('Success');
  })
);

router.get(
  '/group/GET',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const response = await db.query(
      `SELECT users.name AS user_name, user_id, groups.name AS group_name, group_id 
      FROM usersxgroups 
      LEFT JOIN groups ON group_id=groups.id 
      LEFT JOIN users ON user_id=users.id
      WHERE user_id = $1`,
      [myId]
    );
    res.json(response.rows);
  })
);

router.post(
  '/group/:groupId/addUser',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const groupId = req.params.groupId;
    const checkPermission = await db.query(
      `SELECT * FROM usersXgroups WHERE group_id=$1 AND user_id=$2`,
      [groupId, myId]
    );
    if (checkPermission.rowCount === 0 || !checkPermission.rows) {
      return next(createError(404, 'User is not in the group'));
    }
    //Another possible implementing of using checkboxes to add multiple users at the same time
    // const usersToAdd = req.body.usersToAdd;
    // try {
    //   await Promise.all(
    //     usersToAdd.map((userId) =>
    //       db.query(
    //         `INSERT INTO usersXgroups (user_id, group_id) VALUES ($1, $2)`,
    //         [userId, groupId]
    //       )
    //     )
    //   );
    //   res.json({ message: 'Successfully added users to group' });
    // } catch (err) {
    //   next(err);
    // }
    const userToAdd = req.body.usersToAdd;
    const userToAddId = await db.query(`SELECT id FROM users WHERE name=$1`, [userToAdd])
    if (userToAddId.rowCount === 0){
      return res.status(400).json("User not found")
    }
    await db.query(
      `INSERT INTO usersXgroups (user_id, group_id) VALUES ($1, $2)`,
      [userToAddId.rows[0].id, groupId]
    );
    res.json('Successfully added users to group');
  })
);

//get the groupchat log
router.get(
  '/group/:groupId/chat',
  asyncHandler(async (req, res, next) => {
    const chatLog = await db.query(
      `SELECT content, users.name AS postedByname, postedTime FROM group_posts LEFT JOIN users ON group_posts.postedBy = users.id WHERE groupId = $1`,
      [req.params.groupId]
    );
    res.json(chatLog.rows);
  })
);

//post something to the groupchat
router.post(
  '/group/:groupId/chat',
  asyncHandler(async (req, res, next) => {
    const groupId = req.params.groupId;
    const myId = req.user.id;
    const checkPermission = await db.query(
      `SELECT * FROM usersXgroups WHERE group_id=$1 AND user_id=$2`,
      [groupId, myId]
    );
    if (checkPermission.rowCount === 0 || !checkPermission.rows) {
      return next(createError(404, 'User is not in the group'));
    }
    const content = req.body.content;
    const postedBy = req.user.id;
    const postedTime = new Date();
    await db.query(
      `INSERT INTO group_posts (groupId, content, postedBy, postedTime) VALUES ($1, $2, $3, $4)`,
      [groupId, content, postedBy, postedTime]
    );
    res.json('Success');
  })
);

module.exports = router;
