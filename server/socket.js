const passport = require('./authentication/passport.js');

const io = require('socket.io')('50000', {
  cors: {
    origin: '*',
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  // Manually authenticate using Passport
  socket.request.headers['authorization'] = `Bearer ${token}`;
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new Error('Authentication error'));
    }
    socket.user = user;
    next();
  })(socket.request, {}, next);
  //this parameters imitates the (req,res,next) info sent requried for the JWTFromRequest for the JWT authentication
});

io.on('connection', (socket) => {
  socket.join(socket.user.id);
  console.log(socket.user.id);
  socket.on('send-message', (targetId) => {
    console.log(targetId);
    var clients = io.sockets.adapter.rooms.get(targetId);
    console.log(clients);
    socket.to(targetId).emit('receive-message');
  });
});

// io.on('connection', (socket) => {
//   if (socket == null) {
//     document.write('Sorry, there seems to be an issue with the connection!');
//   } else {
//     passport.authenticate('jwt', {session: false}), (err, jwtPayload)=>{
//       console.log(jwtPayload.user);
//     };
//     console.log(socket.request._query['token'])
//     // socket.join("")
//     socket.on('send-message', (room) => {
//       if ((room = '')) {
//         document.write(
//           'Sorry, there seems to be an issue with sending message!'
//         );
//       } else{
//         console.log(room)
//         socket.to(room).emit("receive-message")
//       }
//     });
//   }
// });
