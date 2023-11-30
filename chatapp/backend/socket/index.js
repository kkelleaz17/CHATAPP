const initSocket = (server, corsOptions) => {
    const io = require("socket.io")(server,{ cors: corsOptions });
    
    let users = [];

    const addUser = (userId, socketId) =>{
        !users.some((user)=>user.Id === userId) &&
        users.push({ userId, socketId });
    };
    const removeUser = (socketId) =>{
        users = users.filter((user)=> user.socketId !== socketId);
    };

    const getUser = (userId)=>{
        return users.find((user)=>user.userId===userId);
    };

    io.on("connection", (socket) =>{
        socket.on("addUser", (userId) =>{
            addUser(userId, socket.id);
        });

        socket.on("sendMessage", ({ sender, receivers, message }) =>{
            receivers.forEach((receiverId)=>{
                let user = getUser(receiverId);

                if (user) {
                    io.to(user.socketId). emit("getNewMessage", {
                        sender,
                        message,
                    });
                }
        });
    });
    socket.on("disconnect", ()=>{
        removeUser(socket.id);   
    });
});
};

module.exports = initSocket;