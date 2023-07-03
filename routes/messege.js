const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");

// handelling messeges 
const Messeges = mongoose.model("Message");

// get conversations 
// [conversationID]
// post new conversation 
// [ConversationId , messege , created By]
// conversationId , sender , text

router.get("/msg/getmsg/:id",(req,res)=>{
    let conversationIdUser = req.params.id
    Messeges.find({conversationId:conversationIdUser}).then((alllMsg)=>{
        res.json(alllMsg)
    }).catch(error=>{
        res.json({status:"error",msg:"unable to collect your chats",error})
    })
})
router.post("/msg/postmsg",(req,res)=>{
    console.log('someone new msg')
    let {conversationId , sender , text} = req.body
    let newMsg = new Messeges({conversationId , sender , text});
    newMsg.save().then(msgPosted => {
        return res.json(msgPosted);
    }).catch(error=>  res.json({status:"error",error:"Unable to post Msg"}))
})

module.exports = router;