'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';

const Home = () => {
  useEffect(() => {
    const socket = io('http://localhost:4000'); // replace with your server URL

    // Example: Handling a message from the server
    socket.on('message', (message: string) => {
      console.log(`Received message from server: ${message}`);
    });

    // Example: Emitting a message to the server
    socket.emit('clientMessage', 'Hello from the client');

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Your Next.js component content */}
    </div>
  );
};

export default Home;
