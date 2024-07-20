'use client';

import React, { useState } from "react";
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async (message) => {
        try {
        console.log('Sending message:', message);
        const response = await axios.post('/api/v1/chats', { message });
        return response.data.response;
        console.log('Response:', response);
        } catch (error) {
        console.error('Error sending message:', error);
        return 'エラーが発生しました。後でもう一度試してください。';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
        const userMessage = { text: input, sender: 'user', timestamp: new Date().toLocaleTimeString() };
        setMessages([...messages, userMessage]);
        setInput('');

        const botResponse = await sendMessage(input);
        const botMessage = { text: botResponse, sender: 'bot', timestamp: new Date().toLocaleTimeString() };
        setMessages([...messages, userMessage, botMessage]);
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                <div key={index} style={{ margin: '5px 0' }}>
                    <strong>{msg.sender === 'user' ? 'You' : 'Bot'} ({msg.timestamp})</strong>: {msg.text}
                </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '80%', padding: '10px' }}
                />
                <button type="submit" style={{ width: '20%', padding: '10px' }}>
                Send
                </button>
            </form>
            </div>
    );
};

export default Chat;