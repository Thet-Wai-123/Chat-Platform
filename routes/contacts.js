var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const db = require('../db');

//get all friends of the logged in person
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const myId = req.body.id;

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

router.get(
  '/friend_requests',
  asyncHandler(async (req, res, next) => {
    const myId = req.body.id;

    // res.json(allFriendRequests)
  })
);

router.post(
  '/friend_request/SEND/:targetId',
  asyncHandler(async (req, res, next) => {
    res.json('Hello There');
  })
);

router.post(
  '/friend_request/ACCEPT/:targetId',
  asyncHandler(async (req, res, next) => {
    const myId = req.body.id;
    const friendId = req.params.targetId;
    //implement verifying if the friend request is actually send here!!! you dont' wanna be allowing anyone to make any friends

    const response = await db.query(
      'INSERT INTO friends (from_user, to_user) VALUES($1, $2), ($2,$1)',
      [myId, friendId]
    );
    if (response.rowCount == 0) {
      res.json('Error sending a message');
    } else {
      res.json('Success');
    }
  })
);
//Get chat log
router.get(
  '/:targetId/chat',
  asyncHandler(async (req, res, next) => {
    const myId = req.body.id;
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
    const myId = req.body.id;
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
