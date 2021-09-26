const router = require("express").Router();
const User = require('../models/User.model')



router.get("/", (req, res) => {
  
  User
    .find()
    .select('username role favAudios myAudios rate icon')
    .populate('myAudios')
    .populate('favAudios')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving users", err }))
})

router.get("/:id", (req, res) => {
  
  const { id } = req.params;

  User
    .findById(id)
    .then(user => res.status(200).json({ user, message: "User getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single user", err }))
})



module.exports = router;