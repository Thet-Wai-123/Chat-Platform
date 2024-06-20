const passport = require('./authentication/passport.js');
const { server } = require('./app');
const io = require('socket.io')(server, {
    cors: {
    origin: '*',
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const groupId = socket.handshake.query.groupId;

  // Manually authenticate using Passport
  socket.request.headers['authorization'] = `Bearer ${token}`;
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new Error('Authentication error'));
    }
    socket.user = user;
    socket.groupId = groupId;
    next();
  })(socket.request, {}, next);
  //this parameters imitates the (req,res,next) info sent requried for the JWTFromRequest for the JWT authentication
});

io.on('connection', (socket) => {
  socket.join(socket.user.id);
  if (socket.groupId){
    socket.join("group" + socket.groupId) //in case the userId and groupId collide
  }
  socket.on('send-message', (targetRoom, message) => {
    var sendByName = socket.user.name;
    var sendTime = new Date();
    //emit receive-message to BOTH the sender and receiver
    socket.emit('receive-message', {message, sendByName, sendTime});
    socket.to(targetRoom).emit('receive-message', {message, sendByName, sendTime});
  });
});