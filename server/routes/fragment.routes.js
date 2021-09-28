const router = require("express").Router();
const Fragment = require("../models/Fragment.model");


router.get("/", (req, res) => {

  Fragment
    .find()
    .then(fragments => res.status(200).json(fragments))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving fragments", err }))
})

router.get("/validated", (req, res) => {

  Fragment
    .find({isValidated: false})
    .then(fragments => res.status(200).json({fragments, message:'Search by validated'}))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving fragments by validated", err }))
})

router.get("/:id", (req, res) => {

  const { id } = req.params;

  Fragment
    .findById(id)
    //.populate('bookId')
    .then(fragment => res.status(200).json({ fragment, message: "Fragment getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single fragment", err }))
})

router.post("/", (req, res) => {

  const fragment = req.body;

  Fragment
    .create(fragment)
    .then(fragment => res.status(200).json({ fragment, message: "Fragment created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating fragment", err }))
})

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  Fragment
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Fragment ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting fragment", err }))
})

router.put("/:id", (req, res) => {

  const { content } = req.body
  const { id } = req.params;

  Fragment
    .findByIdAndUpdate(id, { content }, { new: true })
    .then(fragment => res.status(200).json({ fragment, message: "Fragment edited" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error editing fragment", err }))
})



module.exports = router;