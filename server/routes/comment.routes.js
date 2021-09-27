const router = require("express").Router();
const Comment = require('../models/Comment.model')
const Audio = require('../models/Audio.model')


router.get("/", (req, res) => {

  Comment
    .find()
    //.populate('user')
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving comments", err }))
})

router.get("/validated", (req, res) => {

  Comment
    .find({isValidated: false})
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving comment by validated", err }))
})

router.get('/by-user', (req, res) => {

  const userId = '6151918fa7b0cf1ddb4c95fb'

  Comment
  .find({user: userId})
  .populate('user')
  .then(comments => res.status(200).json(comments))
  .catch(err => res.status(500).json({ code: 500, message: 'Error retrieving comments by user', err} ))
})

router.post("/", (req, res) => {

  // const actualUser = req.session.currentUser;
  const id = '6151918fa7b0cf1ddb4c95fb'
  const { text, audioId } = req.body;

  Comment.create({text, user: id})
  .then(comment => Audio.findByIdAndUpdate(audioId, {$push: {comments: comment.id}}))
  .then(() => res.status(200).json({ message: "Comment created and push" }))
  .catch(err => res.status(500).json({ code: 500, message: "Error creating comment", err: err.message }))
})

router.delete("/:id", (req, res) => {
  
  const { id } = req.params;

  Comment
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Comment ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting comment", err }))
})



module.exports = router;