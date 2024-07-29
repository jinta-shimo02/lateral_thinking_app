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
                            <div className="w-16 h-16 rounded-full mt-4">
                                <img
                                    alt="User avatar"
                                    src={msg.sender === 'user' 
                                        ? "assets/turtle.png"
                                        : "assets/labbit_2.png"}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {msg.sender === 'user' ? 'あなた' : '出題者'}
                            <time className="text-xs opacity-50">{msg.timestamp}</time>
                        </div>
                        <div className="chat-bubble bg-secondary">{msg.text}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ margin: '10px' }}>
                <div className="label mt-4">
                    <span className="label-text text-base ">はいかいいえで答えられる質問をして答えをみつけよう！</span>
                </div>
                <input
                    type="text"
                    placeholder="◯◯ですか？"
                    className="input input-bordered border-2 w-full my-4"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ width: '80%', padding: '10px' }}
                />
                <button className="btn btn-secondary" style={{ width: '20%', padding: '10px' }}>
                    質問する
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
