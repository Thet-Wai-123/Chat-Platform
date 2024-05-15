var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const db = require('../db');

//get all friends of the logged in person
router.get(
  '/friends',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const friends = await db.query(
      `SELECT friends.from_user, friends.to_user, name 
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
    SELECT users.name, friend_requests.status
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
  'friend_requests/inbox/SENT',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const friendRequests = await db.query(
      `
    SELECT users.name, friend_requests.status 
    FROM friend_requests
    INNER JOIN users ON friend_requests.receiver_id = users.id
    WHERE sender_id=$1`,
      [myId]
    );
    res.json(friendRequests.rows);
  })
);

router.post(
  '/friend_requests/inbox/SEND/:targetId',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const targetId = req.params.targetId;
    const response = await db.query(`INSERT INTO friend_requests (sender_id, receiver_id) VALUES( $1, $2)`, [myId, targetId]);
    if (response.rowCount == 0) {
      res.json('Error sending a friend request');
    } else {
      res.json('Friend request sent Successfully');
    }

  })
);

router.post(
  '/friend_requests/inbox/ACCEPT/:targetId',
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const friendId = req.params.targetId;
    //implement verifying if the friend request is actually send here!!! you dont' wanna be allowing anyone to make any friends
    let response2;
    //not sure how to test if this fails or not- doing a const response = this promise return undefined??
    await Promise.all[
      (
        db.query(`
        DELETE FROM friend_requests 
        WHERE receiver_id=$1 AND sender_id=$2
        `, [myId, friendId]),
        response2 = db.query(
        'INSERT INTO friends (from_user, to_user) VALUES($1, $2), ($2,$1)',
        [myId, friendId]
      ))
    ];
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
    const response = await db.query(
      'INSERT INTO posts (content, postedBy, postedTo, postedTime) VALUES ($1,$2,$3,$4)',
      [content, myId, targetId, time]
    );
    if (response.rowCount == 0) {
      res.json('Error sending a message');
    } else {
      res.json('Posted Successfully');
    }
  })
);

module.exports = router;
