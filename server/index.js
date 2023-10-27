

import express from "express"
import dotevn from "dotenv"
import cors from "cors"
import AuthRoutes from "./routes/AuthRoutes.js"
import MessageRoutes from "./routes/MessageRoutes.js"
import { Server } from "socket.io"

dotevn.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static("uploads/images"));
app.use("/uploads/recordings", express.static("uploads/recordings"));

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);



const server = app.listen(3005,()=>{
    console.log("server is running at 3005");
})

const io = new Server(server,{
    cors:{
        origin:"*",
        methods: ["GET", "POST"]
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",{
                from:data.from,
                message:data.message
            })
        }
    });
})
