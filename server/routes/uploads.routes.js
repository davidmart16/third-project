const router = require("express").Router();
const {CDNupload, cloudinary} = require ('../config/cloudinary.config')
const fs = require("fs")
// AQUI CAMBIAR LAS IMAGENES POR AUDIOS

router.post('/audio', CDNupload.single("audioData"), (req, res) => {

  if (!req.file) {
    res.status(500).json({ code: 500, message: 'Error loading the file' })
    return
  }

  //generado un archivo en el sistema operativo
  let uploadLocation = __dirname + '/../audioFiles/' + req.file.originalname;
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)) );

  //a cloudinary le pasas el archivo "fisico" que acabamos de crear
  cloudinary.uploader.upload(
    uploadLocation, 
    { resource_type: "video", folder: `audioFiles/`, overwrite: true },

    (error, result) => {
      if (error) res.status(500).json(error)
      else {
        // Delete the temporary file from the server
        fs.unlink(uploadLocation, (deleteErr) => {
          if (deleteErr) res.status(500).send(deleteErr);
          console.log('temp file was deleted');
          res.status(200).json({fileUrl: result.secure_url});
        });
      }
    }

  );  

})


module.exports = router;
