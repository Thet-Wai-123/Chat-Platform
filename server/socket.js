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
  socket.on('send-message', (targetId, message) => {
    var sendByName = socket.user.name;
    var sendTime = new Date();
    //emit receive-message to BOTH the sender and receiver
    socket.emit('receive-message', {message, sendByName, sendTime});
    socket.to(targetId).emit('receive-message', {message, sendByName, sendTime});
  });
});