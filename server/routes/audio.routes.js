const router = require("express").Router();
const Audio = require('../models/Audio.model');
const Fragment = require("../models/Fragment.model");
const User = require("../models/User.model");



router.get("/", (req, res) => {

  Audio
    .find({isValidated: true})
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

  const fragment = req.body

  Audio
    .find(fragment)
    //.populate('fragment')
    .then(audios => res.status(200).json(audios))
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

  const currentUser = '6151918fa7b0cf1ddb4c95fb' //req.session.currentUser._id
  const {audioFile, text, rate} = req.body;

  Fragment
  .findOne({content: text})
  .then(oneFragment=> Audio.create({audioFile, fragment: oneFragment.id, book: oneFragment.bookId, rate}))
  .then(audio => User.findByIdAndUpdate( currentUser, { $push: {myAudios: audio.id}}, {new: true} ))
  .then(() => res.status(200).json({ message: "Audio created" }))
  .catch(err => res.status(500).json({ code: 500, message: "Error creating audio", err: err.message }))
 
})

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  Audio
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Audio ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting audio", err }))
})


module.exports = router;