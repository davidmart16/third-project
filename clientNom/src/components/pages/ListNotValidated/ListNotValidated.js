import { Component } from "react";
import FragmentsService from '../../../services/fragments.service'
import AudiosService from '../../../services/audios.service'
import CommentsService from '../../../services/comments.service'
import FragmentsNotValidated from "./FragmentsNotValidated/FragmentsNotValidated";
import CommentsNotValidated from "./CommentsNotValidated/CommentsNotValidated";
import AudiosNotValidated from "./AudiosNotValidated/AudiosNotValidated";


class ListNotValidated extends Component {
    constructor(){
        super()
        
        this.state={
            fragmentsNotValidated: null,
            audiosNotValidated: null,
            commentsNotValidated: null
        }
        
        this.fragmentService = new FragmentsService()
        this.audioService = new AudiosService()
        this.commentService = new CommentsService()
    }
    
    componentDidMount(){

        this.getNotValidated()
    }
    

    
    getNotValidated(){
        // const info = {fragments: null, audios: null, comments: null}
    
        const promiseArray = [this.fragmentService.getFragmentsNotValidated(), this.audioService.getAudiosNotValidated(), this.commentService.getCommentsNotValidated()]
        
        Promise.all(promiseArray)
        .then((result) => {
            const [fragments, audios, comments] = result
    
            this.setState({
                ...this.state,
                fragmentsNotValidated:fragments.data.fragments,
                audiosNotValidated: audios.data,
                commentsNotValidated: comments.data
            })
    
        })
        .catch(err => console.log(err))
        

    }


    handleChange = (audioId, userId) => {
        this.audioService.updateAudio(audioId, userId)
        .then(() => this.getNotValidated())
        .catch(err => console.log(err))
    }



    
    render(){
        return(
            <>
                <h2>Validaciones</h2>
                <FragmentsNotValidated  fragments={this.state.fragmentsNotValidated}></FragmentsNotValidated>
                <CommentsNotValidated comments={this.state.commentsNotValidated}></CommentsNotValidated>
                <AudiosNotValidated audios={this.state.audiosNotValidated} handleC></AudiosNotValidated>
            </>
        )
    }
}

export default ListNotValidated