import React, { useState, useEffect } from "react";
import axios from 'axios';

function Chat() {
    const [messageText, setMessageText] = useState('');
    const [groupMessage, setGroupMessage] = useState([
        { "sender": "bot", "data": { "text": "Hi! I'm Samantha, how are your goals progressing?" } }
    ]);

    const sendMessage = async () => {
        if (!messageText.trim()) return; // Prevent sending empty messages
        const userMessage = {
            "sender": "client",
            "data": { "text": messageText }
        };
        setGroupMessage(prevMessages => [...prevMessages, userMessage]);

        try {
            const formData = { "message": messageText };
            const response = await axios.post("http://127.0.0.1:5000/send_message", formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            const botResponse = {
                "sender": "bot",
                "data": { "text": response.data.response }
            };
            setGroupMessage(prevMessages => [...prevMessages, botResponse]);
            setMessageText(''); // Clear input field after sending the message
        } catch (e) {
            console.log(e);
        }
    };

    const scrollToBottom = () => {
        const chat = document.getElementById("chatList");
        chat.scrollTop = chat.scrollHeight;
    };

    const handleSubmit = event => {
        event.preventDefault();
        sendMessage();
    };

    const handleChange = event => {
        setMessageText(event.target.value);
    };

    useEffect(() => {
        scrollToBottom();
    }, [groupMessage]);

    return (
        <div className="chatWindow">
            <div className="chatContent">
                <ul className="chat" id="chatList">
                    {groupMessage.map((data, index) => (
                        <div key={index}>
                            {data.sender === "client" ? (
                                <li className="clientMessage">
                                    <div className="msg">
                                        <div className="message">{data.data.text}</div>
                                    </div>
                                </li>
                            ) : (
                                <li className="botMessage">
                                    <div className="msg">
                                        <div className="message">{data.data.text}</div>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
            <div className="chatInputCover">
                <div className="chatInputWrapper">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="messageInput"
                            type="text"
                            placeholder="Enter your message..."
                            value={messageText}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;