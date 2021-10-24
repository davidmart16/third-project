
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import AudiosService from '../../../../services/audios.service'
import UploadsService from '../../../../services/uploads.service'

const uploadService = new UploadsService()
const audioService = new AudiosService()

function AudioForm ({ loggedUser }) {

  const [fragment, setFragment] = useState('')
  const [audioFile, setAudioFile] = useState('')
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const { fragmentId } = useParams()
  const history = useHistory()



  useEffect(() => {
    
    setUserId(loggedUser._id)
    setFragment(fragmentId)
    
  }, [])

 
  const handleFile = (e) => {
    
    setIsLoading(true)

    const uploadData = new FormData()
    
    uploadData.append('audioData', e.target.files[0])
    uploadService.uploadAudio(uploadData)
      .then(res => {
          setIsLoading(false)
          setAudioFile(res.data.fileUrl)
        })
      .catch(err => alert("Error, no se ha subido el audio"))
  }


    const handleSubmit = (e) => {
        e.preventDefault()
        audioService.createAudio({fragment: fragment, audioFile: audioFile, userId: userId})
        .then(() => {
            history.push(`/fragmentos/${fragment}`)
        })
    }


    return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="audioFile">
          <Form.Label>Archivo de audio: </Form.Label>
          <Form.Control onChange={(e) => handleFile(e)} name="audioFile" type="file" />
        </Form.Group>


        {isLoading && <p>Subiendo archivo</p>}

        <Button disabled={isLoading} variant="primary" type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
      <Link to={`/fragmentos/${fragment}`}>
          <Button>Volver a libros</Button>
      </Link> 
    </>
    )

}

export default AudioForm