const socketIo = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

const getSocketInstance = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = {
  initializeSocket,
  getSocketInstance,
};
