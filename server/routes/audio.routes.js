const router = require("express").Router();
const Audio = require('../models/Audio.model')



router.get("/", (req, res) => {

  Audio
    .find()
    .select('audioFile rate')
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

  const {audioFile} = req.body;
  const fragmentId= req.params

  Audio
    .create({audioFile, fragment: fragmentId})
    .then(audio => res.status(200).json({ audio, message: "Audio created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating audio", err }))
})

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  Audio
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Audio ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting audio", err }))
})


module.exports = router;