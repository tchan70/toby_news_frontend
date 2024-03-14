import { useContext, useEffect, useState } from "react"
import { deleteCommentById, getCommentsByArticleId, postCommentByArticleId } from "../utils/api"
import UserContext from "./User"

const Comments = ({ articleId }) =>{
  const [comments, setComments] = useState([])
  const [commentBody, setCommentBody] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { loggedInUser } = useContext(UserContext)

  useEffect(() => {
    getComments()
  }, [articleId])

  const getComments = () => {
    getCommentsByArticleId(articleId)
      .then((comments) => {
        setComments(comments)
      })
      .catch((err) => {
        console.log(err, "error fetching comments")
      })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (commentBody.length === 0) {
      setErrorMessage("Please enter a comment.");
      return
    }

    const newComment = {
      username: loggedInUser.username,
      body: commentBody,
      votes: 0,
      created_at: new Date().toISOString(),
      author: loggedInUser.username,
    }

    setSuccessMessage("Comment posting in progress...")

    postCommentByArticleId(newComment, articleId)
      .then((response) => {
        setSuccessMessage("Comment posted successfully!")
        setErrorMessage("")
        setComments([...comments, response])
        setCommentBody("")
      })
      .catch((err) => {
        console.log(err, "error posting comment")
        setErrorMessage("Failed to post comment. Please try again.")
      })
  }

  const removeComment = (comment_id) => {
    deleteCommentById(comment_id)
      .then(() => {
        setComments(comments.filter((comment) => comment.comment_id !== comment_id))
      })
      .catch((err) => {
        console.log(err, "error deleting comment")
        setErrorMessage("Failed to delete comment. Please try again.")
      })
  }

  return (
    <div>
      <h3>Add a comment:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-body">Enter a comment:</label>
        <input
          value={commentBody}
          id="comment-body"
          name="new-comment-body"
          type="text"
          onChange={(event) => setCommentBody(event.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h3 className="comments-header">Comments</h3>
      {comments && (
        <div className="comments-container">
          {comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p className="comment-body">{comment.body}</p>
              <p className="comment-votes">Upvotes: {comment.votes}</p>
              <p className="comment-date">Posted at: {formatDate(comment.created_at)}</p>
              <h5 className="comment-author">Author: {comment.author}</h5>
              {loggedInUser.username === comment.author && 
              (<button onClick={() => removeComment(comment.comment_id)}>Delete Comment</button>)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Comments