import React from "react";

/*
function Chat() {
    return (
        <h1>this is the chat</h1>
    );
} export default Chat;
*/

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageText: null,
            groupMessage: [
                {"sender": "client", "data": {"text": "hello"}},
                {"sender": "bot", "data": {"text": "hi"}},
            ],
            user: {
                uid: "client"
            },
            isAuthenticated: true,
        };

    }

    sendMessage = () => {
        // send message to server
        // add message to messages

        console.log(this.state.messageText);
        this.state.groupMessage.push({"sender": "client", "data": {"text": this.state.messageText}});
        this.setState({ messageText: null });
    };

    scrollToBottom = () => {
        const chat = document.getElementById("chatList");
        chat.scrollTop = chat.scrollHeight;
    };

    handleSubmit = event => {
        event.preventDefault();
        this.sendMessage();
        event.target.reset();
    };

    handleChange = event => {
        this.setState({ messageText: event.target.value });
    };

    messageListener = () => {
        // listen for messages from server
        // add message to messages
        // TODO
    };

    render() {
        return (
            <div className="chatWindow">
                <ul className="chat" id="chatList">
                    {this.state.groupMessage.map(data => (
                        <div key={data.id}>
                            {data.sender === "client" ? (
                                <li className="clientMessage">
                                    <div className="msg">
                                        <div className="message"> {data.data.text}</div>
                                    </div>
                                </li>
                            ) : (
                                <li className="botMessage">
                                    <div className="msg">
                                        <div className="message"> {data.data.text} </div>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                </ul>
                <div className="chatInputWrapper">
                    <form onSubmit={this.handleSubmit}>
                        <input
                        className="messageInput"
                        type="text"
                        placeholder="Enter your message..."
                        onChange={this.handleChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
export default Chat;