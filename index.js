// config environment varriables 
require("dotenv").config()

// importing packages
const mongoose =  require("mongoose")
const http = require("http");
// const { Server } = require("socket.io");
const cors = require("cors")
const app = require("express")();
const HTTP_Server = http.createServer();

app.use(cors());
require("./schema/user.schema")
require("./schema/post.schema")
require("./schema/message.schema")
require("./schema/conversation.schema")

mongoose.connect(process.env.MongoUri)
mongoose.connection.on("connected",()=>console.log("🚀 Database connected"))
mongoose.connection.on("error",()=>console.log("💡 Database Error"))
app.use(require('express').json())
app.listen(process.env.PORT , () => {
  console.log("🔔 SocketIo server started");
});


app.use('/',require("./routes/conversation"))
app.use('/',require("./routes/messege"))

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

