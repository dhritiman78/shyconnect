'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FaHeart, FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const mockConnections = [
  {
    id: 1,
    name: 'Emma Watson',
    avatar: null,
    status: 'accepted',
    lastMessage: 'Hey there! 😊',
  },
  {
    id: 2,
    name: 'John Doe',
    avatar: null,
    status: 'pending',
    lastMessage: '',
  },
];

const ChatPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch connection details
  useEffect(() => {
    const connectionData = mockConnections.find((conn) => conn.id === parseInt(id));
    if (!connectionData || connectionData.status !== 'accepted') {
      toast.error('Connection not found or not accepted');
      router.push('/user/connection/all'); // Redirect if not accepted
    } else {
      setConnection(connectionData);
      setMessages([
        { from: 'Emma Watson', message: 'Hello! 👋', isUser: false },
        { from: 'You', message: 'Hi there!', isUser: true },
      ]);
    }
  }, [id, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { from: 'You', message: newMessage, isUser: true }]);
      setNewMessage('');
    }
  };

  if (!connection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-pink-500 text-white py-4 px-6 flex items-center gap-4 shadow-md">
        {connection.avatar ? (
          <img src={connection.avatar} alt={connection.name} className="w-10 h-10 rounded-full" />
        ) : (
          <FaUserCircle className="text-white text-3xl" />
        )}
        <h1 className="text-lg font-bold">{connection.name}</h1>
        <FaHeart className="ml-auto text-white text-2xl animate-pulse" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          msg.isUser ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {msg.message.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>


      {/* Chat Input */}
      <div className="bg-white p-4 flex items-center gap-2 shadow-md sticky bottom-0">
      <textarea
  placeholder="Type a message..."
  value={newMessage}
  onChange={(e) => setNewMessage(e.target.value)}
  className="w-full h-12 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
  style={{ boxSizing: "border-box" }}
/>


        <button
          onClick={handleSendMessage}
          className="bg-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-pink-600"
        >
          <FaPaperPlane /> Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
