const router = require("express").Router();
const uploader = require ('../config/upload.config')

//AQUI CAMBIAR LAS IMAGENES POR AUDIOS

// router.post('/image', uploader.single("imageData"), (req, res) => {

//   if (!req.file) {
//     res.status(500).json({ code: 500, message: 'Error loading the file' })
//     return
//   }

//   res.json({ cloudinary_url: req.file.path })
// })


module.exports = router;
