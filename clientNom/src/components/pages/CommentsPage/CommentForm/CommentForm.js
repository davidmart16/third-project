import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import CommentsService from "../../../../services/comments.service"
import { FaStar } from "react-icons/fa"
import './CommentForm.css'

const commentService = new CommentsService()

function CommentForm (props) {

  const [text, setText] = useState('')
  const [userId, setUserId] = useState('')
  const [audioId, setAudioId] = useState('')
  const [rate, setRate] = useState(null)
  const [hover, setHover] = useState(null)

    useEffect(() => {
      const userId = props.loggedUser._id
      const { audioId } = props.match.params

      setAudioId(audioId)
      setUserId(userId)
      
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        commentService.createComment({text: text, user: userId, audioId: audioId, rate: rate})
        .then(()=> {
            props.history.push(`/audios/${audioId}`)
        })
        .catch(err => console.error(err))
        
    }

    const handleChange = (e) => {

    const { name, value } = e.target;
    if (name === 'rate') setRate(value)
    else if (name === 'hover') setHover(value)
    else if (name === 'text') setText(value)
    
    }



        return(

            <Form onSubmit={handleSubmit}>
            <h2>Valora el audio </h2>
          {[...Array(5)].map((star, idx) => {
            const rateValue = idx + 1;

            return (
              <label key={idx}>
                <input
                  id="starRadio"
                  type="radio"
                  name="rate"
                  value={rateValue}
                  onClick={(e) => handleChange(e)}
                />
                <FaStar
                  className="star"
                  color={
                    rateValue <= (hover || rate) ? "#ffc107" : "#e4e5e9"
                  }
                  size={30}
                  onMouseEnter={() => setRate(rateValue)
                    }
                  onMouseLeave={() => setHover(null)
                      }
                />
              </label>
            );
          })}
                <Form.Group className="mb-3" controlId="text">
                
                    <Form.Label><h4>Comentario: </h4></Form.Label>
                    <Form.Control onChange={(e) => handleChange(e)} name="text" value={text} type="text" placeholder="Deja tu comentario" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
}

export default CommentForm