import { Server } from 'socket.io';

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  console.log('🔌 Socket.IO initialized');
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized. Call initializeSocket first.');
  }
  return io;
};

// Emit events to all connected clients
export const emitDataUpdate = (collection, action, data) => {
  if (io) {
    io.emit('data-update', {
      collection,
      action, // 'create', 'update', 'delete'
      data,
      timestamp: new Date().toISOString(),
    });
    console.log(`📡 Emitted ${action} event for ${collection}`);
  }
};

// Emit to specific rooms
export const emitToRoom = (room, event, data) => {
  if (io) {
    io.to(room).emit(event, data);
  }
};

export default {
  initializeSocket,
  getIO,
  emitDataUpdate,
  emitToRoom,
};
