import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../util';

const CreateRoom = ({ user, err, setErr, selectedUsers }) => {
    const [roomName, setRoomName] = useState("");
    let navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        if (roomName == "") {
            return setErr("You must give a room name");
        }
        if (selectedUsers.length < 2) {
            return setErr("You must select more than one contact");
        }
        setErr();
        axios.post(`${baseURL}/users/${user._id}/chat`, {
            name: roomName,
            members: selectedUsers,
            type: "room",
        }, { withCredentials: true }).then(res => {
            navigate("/");
        })
        setRoomName("");
    }
    return (
        <div className='form-wrapper' id='createRoom'>
            <div className="container">
                <h1>Create A Room</h1>
                {err &&
                    <div className="err">
                        <p>{err}</p>
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Room Name" name="roomName" value={roomName} onChange={e => setRoomName(e.target.value)} />
                    <button type="submit" className="btn">Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;