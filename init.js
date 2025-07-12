const mongoose = require("mongoose");
const Chat = require("./models/chat.js"); 

main()
.then(()=>{
console.log("connection is successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}
let allchats = [
    {
        from : "neha",
        to : "preeti",
        msg : "what is your name",
        created_at : new Date(),
    },
    {
        from : "raj",
        to : "preti",
        msg : "what is your name",
        created_at : new Date(),
    },
    {
        from : "nha",
        to : "peti",
        msg : "what is your name",
        created_at : new Date(),
    },
    {
        from : "ha",
        to : "preei",
        msg : "what is your name",
        created_at : new Date(),
    },
    {
        from : "neh",
        to : "preet",
        msg : "what is your name",
        created_at : new Date(),
    },
    {
        from : "na",
        to : "reeti",
        msg : "what is your name",
        created_at : new Date(),
    },

]
Chat.insertMany(allchats);

