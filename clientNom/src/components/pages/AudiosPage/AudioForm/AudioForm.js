
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AudiosService from '../../../../services/audios.service'
import UploadsService from '../../../../services/uploads.service'


class AudioForm extends Component {
    constructor(){
        super()

        this.state = {
          fragment: "",
          audioFile: '',
          userId: '',
          isLoading: null
        }
    }

  uploadService = new UploadsService()
  audioService = new AudiosService()

  componentDidMount () {
    const { fragmentId } = this.props.match.params;
    console.log('este es el fragmentID que le paso al form',fragmentId)
    console.log(this.props)
        this.setState({
            ...this.state,
            userId: this.props.loggedUser._id,
            fragment: fragmentId
        })
  }
  // handleChange = (e) => {
  //   const { value, name } = e.target;

  //   this.setState({
  //     ...this.state,
  //     [name]: value
  //   })
  // }

  handleFile = (e) => {
    this.setState({
      ...this.state,
      isLoading: true
    })

    const uploadData = new FormData()
    uploadData.append('audioData', e.target.files[0])

    this.uploadService.uploadAudio(uploadData)
      .then(res => {
        this.setState({
          ...this.state,
          isLoading: false,
          audioFile: res.data.fileUrl
        })
        // console.log(res.data.fileUrl)
      })
      .catch(err => alert("Error, no se ha subido el audio"))
  }



    handleSubmit = (e) => {
        e.preventDefault()

        this.audioService.createAudio({fragment: this.state.fragment, audioFile: this.state.audioFile, userId: this.state.userId})
        .then(() => {
            // this.props.reloadFragments()
            this.props.history.push(`/fragmentos/${this.state.fragment}`)
        })
    }

  render() {
    return (
    <>
      <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="audioFile">
          <Form.Label>Archivo de audio: </Form.Label>
          <Form.Control onChange={(e) => this.handleFile(e)} name="audioFile" type="file" />
        </Form.Group>


        {this.state.isLoading && <p>Subiendo archivo</p>}

        <Button disabled={this.state.isLoading} variant="primary" type="submit">
          {this.state.isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
      <Link to={`/fragmentos/${this.state?.fragment}`}>
          <Button>Volver a libros</Button>
      </Link> 
      </>
    )
  }
}

export default AudioForm