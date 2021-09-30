
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import AudiosService from '../../../../services/audios.service'
import UploadsService from '../../../../services/uploads.service'


class AudioForm extends Component {
    constructor(){
        super()

        this.state = {
          fragment: "",
          audioFile: '',
          isLoading: null
        }
    }

  uploadService = new UploadsService()
  audioService = new AudiosService()

  componentDidMount () {
    const { fragmentId } = this.props.match.params;
    console.log(fragmentId)
        this.setState({
            ...this.state,
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

        this.audioService.createAudio({fragment: this.state.fragment, audioFile: this.state.audioFile})
        .then(() => {
            // this.props.reloadFragments()
            this.props.history.push(`/fragmentos/${this.state.fragment}`)
        })
    }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

        {/* <Form.Group className="mb-3" controlId="libro">
          <Form.Label>Libro: </Form.Label>
          <Form.Control  as="select" onChange={(e) => this.handleChange(e)} name="libro" value={this.state.book} type="text" placeholder="Selecciona el libro">
                <option value="DICTUM">Dictamen</option>
                <option value="CONSTANCY">Constancia</option>
                <option value="COMPLEMENT">Complemento</option>
          </Form.Control>
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label>Imagen: </Form.Label>
          <Form.Control onChange={(e) => this.handleChange(e)} name="imageUrl" value={this.state.imageUrl} type="text" placeholder="Introduce imagen" />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="audioFile">
          <Form.Label>Archivo de audio: </Form.Label>
          <Form.Control onChange={(e) => this.handleFile(e)} name="audioFile" type="file" />
        </Form.Group>


        {this.state.isLoading && <p>Subiendo archivo</p>}
{/* <Spinner shape="circle" /> */}

        <Button disabled={this.state.isLoading} variant="primary" type="submit">
          {this.state.isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    )
  }
}

export default AudioForm