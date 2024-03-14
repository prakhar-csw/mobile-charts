"use client";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const Home = () => {
  const [stockData, setStockData] = useState(null);

  const socketRef = useRef<Socket>();

  useEffect(() => { 
    const socket = io('ws://localhost:3001', { transports : ['websocket'] });
    socketRef.current = socket;
    socket.on('message_from_redis', (data) => {
      console.log('data : ',data);
      setStockData(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessageToServer = () =>{ 
    socketRef.current?.emit('message', 'A Random message')
  }

  return (
    <div>
      <h1>Real-Time Stock Updates</h1>
      <button onClick={sendMessageToServer}>
        Click me
      </button>
      {stockData && <p>{stockData}</p>}
    </div>
  );
};

export default Home;