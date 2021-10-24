const router = require("express").Router();
const Audio = require('../models/Audio.model');
const Fragment = require("../models/Fragment.model");
const User = require("../models/User.model");


router.get("/", (req, res) => {
  
  Audio
  .find({isValidated: true}) //
  .populate('comments')
  .then(audios => res.status(200).json(audios))
  .catch(err => res.status(500).json({ code: 500, message: "Error retrieving audios", err }))
})

router.get("/validated", (req, res) => {
  
  Audio
  .find({isValidated: false})
  //.select('isValidated fragment book')
  .then(audios => res.status(200).json(audios))
  .catch(err => res.status(500).json({ code: 500, message: "Error retrieving audios", err }))
})

router.get("/by-fragment", (req, res) => {
  
  const {fragment} = req.query
  
  Audio
    .find({fragment:  fragment})
    //.populate('fragment')
    .then(audios =>  res.status(200).json(audios))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving audios", err }))
})

router.get("/:id", (req, res) => {

  const { id } = req.params;
  
  Audio
    .findById(id)
    .populate('fragment book comments')
    .then(audio => res.status(200).json({ audio, message: "Audio getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single audio", err }))
})

router.get("/rating/:id", (req, res) => {

  const { id } = req.params;
  
  Audio
    .findById(id)
    .populate('comments')
    .then(audio => (audio.comments.reduce((acc, elm) => acc += elm.rate || 0 , 0))/audio.comments?.length)
    .then(rate => Audio.findByIdAndUpdate(id, {rate}, {new: true}))
    .then(audio => res.json({audio, message: "todo ok"}))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single audio", err }))
})

router.post("/", (req, res) => {

  const {audioFile, fragment, userId} = req.body.audioFile

  Fragment
  .findById(fragment)
  .then(oneFragment=> Audio.create({audioFile, fragment: oneFragment._id, book: oneFragment.bookId}))
  .then(audio => User.findByIdAndUpdate( userId, { $push: {myAudios: audio.id}}, {new: true} ))
  .then(() => res.status(200).json({ message: "Audio created" }))
  .catch(err => res.status(500).json({ code: 500, message: "Error creating audio", err: err.message }))
 
})

router.put("/:id", (req, res) => {

  const { id } = req.params

  Audio
    .findByIdAndUpdate(id, {isValidated: true}, {new: true})
    .populate('comments')
    .then(audio => res.status(200).json({ audio, message: "Audio updated and validated" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error updating an audio", err }))
})

router.put("/rate/:id", (req, res) => {

  const { id } = req.params
  const { rate } = req.body
  console.log(req.body)
  
  Audio
    .findByIdAndUpdate(id, { rate },{new: true})
    .populate('comments')
    .then(audio => res.status(200).json({ audio, message: "Audio rate updated" },))
    .catch(err => res.status(500).json({ code: 500, message: "Error updating an audio's rate", err }))
})

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  Audio
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Audio ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting audio", err }))
})


module.exports = router;