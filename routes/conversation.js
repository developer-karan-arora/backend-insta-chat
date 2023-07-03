// add to conversation
// get all conversations
const mongoose = require("mongoose");
const router = require("express").Router();
let Conversation = mongoose.model("Conversation");

router.get("/allConversation", (req, res) => {
  Conversation.find({}).then((allConv) => {
    res.json(allConv);
  });
});
router.post("/addConversation", (req, res) => {
  let { userId1, userId2 , userMail1, userMail2 } = req.body;
  // let { userId1 , userId2 } = req.body;
  Conversation.find({ members: { $all: [userId2, userId1] } }).then(
    (conversationFound) => {
      // conversation already exists
      if (conversationFound.length > 0) {
        let conversationId = conversationFound[0]._id;
        console.log(conversationFound);
        return res.json({ msg: "conversation found", conversationFound , conversationId});
      }
      // conversation doesn't exists
      // conversation -> create new Conversation
      let newConversation = new Conversation({members:[userId1, userId2],membersMail:[userMail1, userMail2]})
      newConversation.save().then(newConversation=>{
        let conversationId = newConversation._id
        res.json({status:"success",msg:"Created a new Conversation",newConversation,conversationId})
      })
    }
  );
});
router.get("/deleteAll", (req, res) => {
  Conversation.deleteMany({}).then((result) => {
    res.json({ status: "success", msg: "All data deleted", result });
  });
});

router.get("/myConversation/:id", (req, res) => {
  let _id = req.params.id;
  Conversation.find({ members: { $in: [req.params.id] } }).then((myAll) => {
    res.json(myAll);
  });
});

// router.post("/find", (req, res) => {});
module.exports = router;
