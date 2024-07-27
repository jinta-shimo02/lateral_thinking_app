'use client';

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useStopwatch } from 'react-timer-hook';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [chatCount, setChatCount] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const chatContainerRef = useRef(null);
    const { width, height } = useWindowSize()

    const {
        seconds,
        minutes,
        hours,
        start,
    } = useStopwatch({ autoStart: false });

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

            if (chatCount === 0) {
                start();
            }
            setChatCount(prevCount => prevCount + 1);

            const botResponse = await sendMessage(input);
            const botMessage = { text: botResponse, sender: 'bot', timestamp: new Date().toLocaleTimeString() };
            setMessages(prevMessages => [...prevMessages, botMessage]);

            // コンフェッティの表示条件
            if (botResponse === "正解です！") {
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                }, 3000); // 3秒間表示
            }
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{position: 'relative'}}>
            <div className="divider" style={{ marginTop: '0%'}}></div>
            <div className="stats-container" style={{ zIndex: '1', position: 'absolute', width: '100%', padding: '0 2px', justifyContent: 'center' }}>
                <div className="stats lg:stats-horizontal shadow" style={{ display: 'flex', width: '95%', justifyContent: 'space-around', margin: '5px auto' }}>
                    <div className="stat horizontal" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="stat-title text-sm">チャット回数</div>
                        <div className="stat-value text-primary text-sm" style={{ marginLeft: '2px' }}>{chatCount} 回</div>
                    </div>
                    <div className="stat horizontal" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="stat-title text-sm">経過時間</div>
                        <div className="stat-value text-primary text-sm" style={{ marginLeft: '2px' }}>{`${hours}時間${minutes}分${seconds}秒`}</div>
                    </div>
                </div>
            </div>
            <div
                ref={chatContainerRef}
                className="card bg-base-300 rounded-box h-50"
                style={{ margin:'5px', padding: '55px 5% 5px 5%', height: '500px', overflowY: 'scroll' }}
            >
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? "chat chat-end" : "chat chat-start" }>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-md">
                                <img
                                    alt="User avatar"
                                    src={msg.sender === 'user' 
                                        ? "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKm1v1NZfQDYxjXhOJZxdGMzff1-pRVIojAUTzdapA4FySgjo0mcLaLhJ4fL1Q5BQmgp2_KDhbkx11TaNY3ijlMPkTbXnoWqfO6EzJzL6xnsuv8xYLXCe1NjUGccOIBO53FxX_HXXOkCM/s800/character_boy_normal.png"
                                        : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOHWHEL9dNUbI2eMnwby8Ox0s5qeHH48q6uRbEaNqIyUWvWdEf-l1h0HOMSNdzAIvdoQ5uD7ogp436pttIrMI4N63E-RPC6ySKqpT7gf3q8Z5IrR-kQH5NhFypQiupJc9XjnW5l85BLcg/s800/school_class_seifuku.png"}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {msg.sender === 'user' ? 'あなた' : '解答'}
                            <time className="text-xs opacity-50">{msg.timestamp}</time>
                        </div>
                        <div className="chat-bubble bg-secondary">{msg.text}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ margin: '10px' }}>
                <div className="label">
                    <span className="label-text">はいかいいえで答えられる質問をして答えをみつけよう！</span>
                </div>
                <input
                    type="text"
                    placeholder="◯◯ですか？"
                    className="input input-bordered w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ width: '80%', padding: '10px' }}
                />
                <button className="btn" style={{ width: '20%', padding: '10px' }}>
                    送信
                </button>
            </form>
            {showConfetti && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                    />
                </div>
            )}
        </div>
    );
};

export default Chat;
