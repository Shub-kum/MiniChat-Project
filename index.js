const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js"); 

// app.use("views", path.join(__dirname, "views"));
// app.use("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}));

main()
.then(()=>{
console.log("connection is successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}


app.get("/chats",async(req, res)=>{
let chats = await Chat.find();
console.log(chats);
res.render("index.ejs",{chats});
});

app.get("/chats/new",(req, res)=>{
res.render("new.ejs");
});

app.post("/chats",(req, res)=>{
let {from,to,msg} = req.body;
let newChat = new Chat({
  from : from,
  to : to,
  msg : msg,
  created_at : new Date(),
});
newChat
.save()
.then((res)=>{
  console.log("chat was saved");
})
.catch((err)=>{
  console.log(err);
});
res.redirect("/chats");
});

app.get("/chats/:id/edit",async (req, res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
res.render("edit.ejs",{chat});
});

app.post("/chats/:id",async (req, res)=>{
  let {id} = req.params;
  let {newMsg} = req.body;
  let updatedChat =await Chat.findByIdAndUpdate(id,{msg: newMsg},
    {runValidators: true,new: true}
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

app.get("/", (req, res)=>{
res.send("working!");
});

app.listen(8080, ()=>{
console.log("server is listing in port 8080");
});