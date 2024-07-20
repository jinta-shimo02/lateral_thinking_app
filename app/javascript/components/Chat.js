'use client';

import React, { useState } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
        setMessages([...messages, { text: input, timestamp: new Date().toLocaleTimeString() }]);
        setInput("");
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                <div key={index} style={{ margin: "5px 0" }}>
                    <strong>{msg.timestamp}</strong>: {msg.text}
                </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: "80%", padding: "10px" }}
                />
                <button type="submit" style={{ width: "20%", padding: "10px" }}>
                Send
                </button>
            </form>
        </div>
    );
};

export default Chat;