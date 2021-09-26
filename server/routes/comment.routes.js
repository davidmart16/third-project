const router = require("express").Router();
const Comment = require('../models/Comment.model')



router.get("/", (req, res) => {

  Comment
    .find()
    .populate('user')
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving comments", err }))
})



router.post("/", (req, res) => {
  const actualUser = req.session.currentUser;
  const {text} = req.body;

  Comment
    .create({text, user: actualUser.id})
    .then(comment => res.status(200).json({ comment, message: "comment created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating comment", err }))
})

router.delete("/:id", (req, res) => {
  
  const { id } = req.params;
  Comment
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Comment ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting comment", err }))
})



module.exports = router;