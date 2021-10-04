const router = require("express").Router();
const Audio = require('../models/Audio.model');
const Fragment = require("../models/Fragment.model");
const User = require("../models/User.model");


router.get("/", (req, res) => {
  
  Audio
  .find({isValidated: true}) //
  .populate('comments')
  //.select('audioFile')//rate
  .then(audios => res.status(200).json(audios))
  .catch(err => res.status(500).json({ code: 500, message: "Error retrieving audios", err }))
})

router.get("/validated", (req, res) => {
  
  Audio
  .find({isValidated: false})
  //.select('isValidated fragment book')
  //.populate('fragment')
  .then(audios => res.status(200).json(audios))
  .catch(err => res.status(500).json({ code: 500, message: "Error retrieving audios", err }))
})

router.get("/by-fragment", (req, res) => {
  
  const {fragment} = req.query
  console.log('soy el req query', req.query.fragment.id)
  
  Audio
    .find({fragment:  fragment})
    //.populate('fragment')
    .then(audios => {
      console.log(audios)
      return res.status(200).json(audios)})
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving audios", err }))
})

router.get("/:id", (req, res) => {

  const { id } = req.params;
  
  Audio
    .findById(id)
    .populate('fragment')
    .populate('book')
    .populate('comments')
    .then(audio => res.status(200).json({ audio, message: "Audio getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single audio", err }))
})

router.post("/", (req, res) => {

  const currentUser = req.session.currentUser._id
  const {audioFile, fragment} = req.body;

  Fragment
  .findById(fragment)
  .then(oneFragment=> Audio.create({audioFile, fragment: oneFragment._id, book: oneFragment.bookId}))
  .then(audio => User.findByIdAndUpdate( currentUser, { $push: {myAudios: audio.id}}, {new: true} ))
  .then(() => res.status(200).json({ message: "Audio created" }))
  .catch(err => res.status(500).json({ code: 500, message: "Error creating audio", err: err.message }))
 
})

router.put("/:id", (req, res) => {

  const { id } = req.params;
  // const { isValidated } = req.body
  
  Audio
    .findByIdAndUpdate(id, {isValidated: true})
    .then(audio => res.status(200).json({ audio, message: "Audio updated and validated" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error updating an audio", err }))
})

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  Audio
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Audio ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting audio", err }))
})


module.exports = router;