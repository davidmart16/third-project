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
    .populate('myAudios favAudios')
    .then(user => res.status(200).json({ user, message: "User getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single user", err }))
}) 

router.delete("/:id", (req, res) => {
  
  const { id } = req.params;

  User
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `User ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting user", err }))
})


router.put('/add-fav-audios/:id', (req, res)=> {

  // const currentUser =  req.session.currentUser  //'6151918fa7b0cf1ddb4c95fb'
  const {audioId, id} = req.body

  User
  .findById(id)
  .then(user => {

      if (user.favAudios.includes(audioId)){
        
        User   
            .findByIdAndUpdate( id, { $pull: {favAudios: audioId} }, {new: true})
            .then(user => res.status(200).json({ user, message: "User updated with my favourites audios" }))
            .catch(err => res.status(500).json({ code: 500, message: 'Error adding fav audios', err}))
            
      } else {
            
        User   
        .findByIdAndUpdate( id, { $push: {favAudios: audioId} }, {new: true})
        .then(user => res.status(200).json({ user, message: "User updated with my favourites audios" }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error adding fav audios', err}))
        
      }
    }
  )
})

// router.get("/my-audios/:id", (req, res) => {

//   const {id} =  req.params  // '6151918fa7b0cf1ddb4c95fb' //req.session.currentUser._id
  
//   User
//     .findById(id)
//     .populate('myAudios')
//     .then(user => res.status(200).json({ user }))
//     .catch(err => res.status(500).json({ code: 500, message: "Error retrieving my audios", err }))
// })

// router.get("/my-fav-audios/:id", (req, res) => {

//   const {id} =  req.params  // '6151918fa7b0cf1ddb4c95fb' //req.session.currentUser._id
  
//   User
//     .findById(id)
//     .populate('favAudios')
//     .then(user => res.status(200).json({ user }))
//     .catch(err => res.status(500).json({ code: 500, message: "Error retrieving favourites audios", err }))
// })

module.exports = router;