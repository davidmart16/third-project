import { useEffect, useState } from "react";
import FragmentsService from '../../../services/fragments.service'
import AudiosService from '../../../services/audios.service'
import CommentsService from '../../../services/comments.service'
import FragmentsNotValidated from "./FragmentsNotValidated/FragmentsNotValidated";
import CommentsNotValidated from "./CommentsNotValidated/CommentsNotValidated";
import AudiosNotValidated from "./AudiosNotValidated/AudiosNotValidated";
import './ListNotValidated.css'

const fragmentService = new FragmentsService()
const audioService = new AudiosService()
const commentService = new CommentsService()

function ListNotValidated() {

    const [fragmentsNotValidated, setFragmentsNotValidated] = useState(null)
    const [audiosNotValidated, setAudiosNotValidated] = useState(null)
    const [commentsNotValidated, setCommentsNotValidated] = useState(null)

    useEffect(() => {
        getNotValidated()
    }, [])

    
    const getNotValidated = () => {
    
        const promiseArray = [fragmentService.getFragmentsNotValidated(), audioService.getAudiosNotValidated(), commentService.getCommentsNotValidated()]
        
        Promise.all(promiseArray)
        .then((result) => {
            const [fragments, audios, comments] = result
            setFragmentsNotValidated(fragments.data)
            setAudiosNotValidated(audios.data)
            setCommentsNotValidated(comments.data)
        })
        .catch(err => console.log(err))
    }

        return(
            <>
                <FragmentsNotValidated  fragments={fragmentsNotValidated} getNotValidated={() => getNotValidated()}></FragmentsNotValidated>
                <CommentsNotValidated comments={commentsNotValidated} getNotValidated={() => getNotValidated()}></CommentsNotValidated>
                <AudiosNotValidated audios={audiosNotValidated} getNotValidated={() => getNotValidated()}></AudiosNotValidated>
            </>
        )
}

export default ListNotValidated