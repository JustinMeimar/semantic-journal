import React, { useState, useEffect } from "react";
import axios from 'axios';

function Chat() {
    const [messageText, setMessageText] = useState('');
    const [groupMessage, setGroupMessage] = useState([
        { "sender": "bot", "data": { "text": "Hi there! How can I assist you today?" } }
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


// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// function Chat() {
//     const [messageText, setMessageText] = useState(null);
//     const [groupMessage, setGroupMessage] = useState([
//         { "sender": "client", "data": { "text": "hello" } },
//         { "sender": "bot", "data": { "text": "hi" } }
//     ]);
//     const [user] = useState({ uid: "client" });
//     const [isAuthenticated] = useState(true);

//     const sendMessage = async () => {
//         try {
//             const formData = { "message": messageText }
//             console.log(formData)
//             await axios.post("http://127.0.0.1:5000/send_message", formData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             setGroupMessage(groupMessage.concat({
//                 "sender": "client", "data": { "text": messageText }
//             }));
//             setMessageText(null);
//             messageListener();
//         } catch (e) {
//             console.log(e)
//         }
//     };

//     const scrollToBottom = () => {
//         const chat = document.getElementById("chatList");
//         chat.scrollTop = chat.scrollHeight;
//     };

//     const handleSubmit = event => {
//         event.preventDefault();
//         sendMessage();
//         event.target.reset();
//     };

//     const handleChange = event => {
//         setMessageText(event.target.value);
//     };

//     const messageListener = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:5000/get_message');
//             console.log(response.data);
//             const botResponse = { 
//                 sender: "bot", 
//                 data: { text: response.data.message }
//             };
            
//             setGroupMessage(prevMessages => [...prevMessages, botResponse]);

//         } catch (error) {
//             // handle error
//         }
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [groupMessage]);

//     return (
//         <div className="chatWindow">
//             <div className="chatContent">
//                 <ul className="chat" id="chatList">
//                     {groupMessage.map(data => (
//                         <div key={data.id}>
//                             {data.sender === "client" ? (
//                                 <li className="clientMessage">
//                                     <div className="msg">
//                                         <div className="message"> {data.data.text}</div>
//                                     </div>
//                                 </li>
//                             ) : (
//                                 <li className="botMessage">
//                                     <div className="msg">
//                                         <div className="message"> {data.data.text} </div>
//                                     </div>
//                                 </li>
//                             )}
//                         </div>
//                     ))}
//                 </ul>
//             </div>
//             <div className="chatInputCover">
//                 <div className="chatInputWrapper">
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             className="messageInput"
//                             type="text"
//                             placeholder="Enter your message..."
//                             onChange={handleChange}
//                         />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;