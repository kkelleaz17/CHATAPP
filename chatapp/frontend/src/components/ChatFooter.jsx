import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../util';

const ChatFooter = ({ openChat, socket, user, setMessages }) => {
    const [message, setMessage] = useState("");
    const handleSubmit = async e => {
        e.preventDefault();
        const newMessage = {
            sender: user._id,
            message,
            chatId: openChat.chatId
        }
        let receivers = openChat.members.filter(memberId => memberId !== user._id);
        socket.current.emit("sendMessage", {
            sender: user._id,
            receivers,
            message
        })
        await axios.post(`${baseURL}/users/message`, newMessage).then(res => {
            setMessages(prev => [...prev, res.data]);
        }).catch(err => {console.log(err)});
        setMessage("");
    }
   
    return (
        <div className='chat-footer'>
            <form className='form' onSubmit={handleSubmit}>
                <input type="text" placeholder="Write Message" className='message' value={message} onChange={e => setMessage(e.target.value)} />
                <button className="sendBtn"><i className="bi bi-send-fill"></i></button>
            </form>
        </div>
    )
}

export default ChatFooter;