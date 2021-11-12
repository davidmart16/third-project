const router = require("express").Router();
const Comment = require('../models/Comment.model')
const Audio = require('../models/Audio.model')


router.get("/", (req, res) => {

  Comment
    .find({isValidated: true})
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
  .find({user: userId, isValidated: true})
  .populate('user')
  .then(comments => res.status(200).json(comments))
  .catch(err => res.status(500).json({ code: 500, message: 'Error retrieving comments by user', err} ))
})

router.post("/", (req, res) => {

  console.log(req.body)
  const { text, audioId, user, rate } = req.body;

  Comment.create({text, user, rate})
  .then(comment => Audio.findByIdAndUpdate(audioId, {$push: {comments: comment.id}}))
  .then(audio => res.status(200).json({ audio, message: `Comment created and push in this audio ${audio._id}` }))
  .catch(err => res.status(500).json({ code: 500, message: "Error creating comment", err: err.message }))
})

router.put("/:id", (req, res) => {

  const { id } = req.params;
  
  Comment
    .findByIdAndUpdate(id, {isValidated: true})
    .then(comment => res.status(200).json({ comment, message: "Comment updated and validated" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error updating an comment", err }))
})


router.delete("/:id", (req, res) => {
  
  const { id } = req.params;

  Comment
    .findByIdAndDelete(id)
    .then(() => Audio.find({comments: id}))
    // .then(audios => {
    //   return audios.forEach(audio => Audio.findByIdAndUpdate(audio._id,{ $pull: {comments: id} }) )
    // })
    .then( () => res.status(200).json({ message: `Comment ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting comment", err }))
})

// router.get("/by-comments", (req, res) => {

//   Audio
//     .find({comments: id})
//     .then(audios => res.status(200).json(audios))
//     .catch(err => res.status(500).json({ code: 500, message: "Error retrieving audios by comment", err }))
// })


module.exports = router;