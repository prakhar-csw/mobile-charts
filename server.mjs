// server.tsx
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // replace with your frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Emitting a message to the client on connection
  socket.emit('message', 'Welcome to the server!');

  // Example: Handling a message from the client
  socket.on('clientMessage', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(4000, () => {
  const { port } = httpServer.address();
  console.log(`Socket.io server listening on port ${port}`);
});
