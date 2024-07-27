'use client';

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatContainerRef = useRef(null);

    const sendMessage = async (message) => {
        try {
            console.log('Sending message:', message);
            const response = await axios.post('/api/v1/chats', { message });
            console.log('Response:', response);
            return response.data.response;
        } catch (error) {
            console.error('Error sending message:', error);
            return 'エラーが発生しました。後でもう一度試してください。';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user', timestamp: new Date().toLocaleTimeString() };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInput('');

            const botResponse = await sendMessage(input);
            const botMessage = { text: botResponse, sender: 'bot', timestamp: new Date().toLocaleTimeString() };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            <div className="divider" style={{ marginTop: '0%'}}></div>
            <div
                ref={chatContainerRef}
                className="card bg-base-300 rounded-box h-50"
                style={{ margin:'5px', padding: '5% 10%', height: '500px', overflowY: 'scroll' }}
            >
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? "chat chat-end" : "chat chat-start" }>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User avatar"
                                    src={msg.sender === 'user' 
                                        ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {msg.sender === 'user' ? 'Anakin' : 'Obi-Wan Kenobi'}
                            <time className="text-xs opacity-50">{msg.timestamp}</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ margin: '10px' }}>
                <div className="label">
                    <span className="label-text">はいかいいえで答えられる質問をして答えをみつけよう！</span>
                </div>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ width: '80%', padding: '10px' }}
                />
                <button className="btn" style={{ width: '20%', padding: '10px' }}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
