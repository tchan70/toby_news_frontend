import { useContext, useEffect, useState } from "react"
import { getArticleById, getCommentsByArticleId, patchArticleVotesById, postCommentByArticleId } from "../utils/api"
import { useParams } from "react-router-dom"
import "./css/singleArticle.css"
import UserContext from "./User";

const SingleArticle = ({ hasVoted, setHasVoted }) =>{
  const [article, setArticle] = useState({})
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [commentBody, setCommentBody] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { loggedInUser } = useContext(UserContext)
  let { articleId } = useParams()
  
  useEffect(() =>{
    setIsLoading(true)
    getArticleById(articleId)
    .then((article) =>{
      setArticle(article)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "this is the error")
    })
    setIsLoading(true)
    getCommentsByArticleId(articleId)
    .then((comments) =>{
      setComments(comments)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "this is the error")
    })
  },[articleId])

  if (isLoading) return <p>Loading...</p>

  const formatDate = (dateString) =>{
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  
  const addUpvote = (articleId) =>{
    if(!hasVoted){
      const votes = {inc_votes: 1}
      patchArticleVotesById(votes, articleId)
      .then((updatedArticle) =>{
        setArticle((article) =>
            article.article_id === updatedArticle.article_id ? {...article, votes: updatedArticle.votes} : article
        )
        setHasVoted(true)
      })
      .catch((err) =>{
        console.log(err, "this is the error")
      })
    }
  }

  const removeUpvote = (articleId) =>{
    if(!hasVoted){
      const votes = {inc_votes: -1}
      patchArticleVotesById(votes, articleId)
      .then((updatedArticle) =>{
        setArticle((article) =>
            article.article_id === updatedArticle.article_id ? {...article, votes: updatedArticle.votes} : article
        )
        setHasVoted(true)
      })
      .catch((err) =>{
        console.log(err, "this is the error")
      })
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    if(commentBody.length === 0){
      return alert("Please enter a comment.")
    }

    event.target.querySelector(".comment-submit-button").disabled = true

    const newComment = {
      "username": loggedInUser.username,
      "body": commentBody,
      "votes": 0,
      "created_at": new Date().toISOString(),
      "author": loggedInUser.username
    }

    setComments((prevComments) => [...prevComments, newComment])
    setCommentBody("")

    postCommentByArticleId(newComment, articleId)
    .then((response) =>{
      console.log(response)
      setSuccessMessage("Comment posted sucessfully!")
      event.target.querySelector(".comment-submit-button").disabled = false
    })
    .catch((err) =>{
      console.log(err, "this is the error")
      event.target.querySelector(".comment-submit-button").disabled = false
    })
  }

  return (
    <div className="article-page">
      <div className="article-body">
        <h3 className="article-title">{article.title}</h3>
        <h4 className="article-topic">{article.topic.charAt(0).toUpperCase() + article.topic.slice(1).toLowerCase()}</h4>
        <img src={article.article_img_url} className="article-image" alt={article.title}/>
        <p className="article-content">{article.body}</p>
        <p className="article-date">Posted at: {formatDate(article.created_at)}</p>
        <p className="article-votes">Upvotes: {article.votes}</p>
        <p className="article-author">Posted by: {article.author}</p>
        <div className="article-actions">
          <button onClick={() => addUpvote(article.article_id)} disabled={hasVoted}>Upvote</button>
          <button onClick={() => removeUpvote(article.article_id)} disabled={hasVoted}>Downvote</button>
        </div>
    </div>
    <hr className="separator" />
    <h3 className="comments-header">Comments</h3>
    {comments && (
      <div className="comments-container">
        {comments.map((comment) => (
          <div key={comment.comment_id} className="comment">
            <p className="comment-body">{comment.body}</p>
            <p className="comment-votes">Upvotes: {comment.votes}</p>
            <p className="comment-date">Posted at: {formatDate(comment.created_at)}</p>
            <h5 className="comment-author"> {comment.author}</h5>
          </div>
        ))}
      </div>
    )}
    <h3 className="">Add a comment:</h3>
    <div className="add-comment-box">
      <form onSubmit={handleSubmit}>
        <label htmlFor="input" className="add-comment">
          Enter a comment:
          <input value={commentBody} id="comment-body" name="new-comment-body" type="text" onChange={(event) => setCommentBody(event.target.value)}></input>
          </label>
        <button type="submit" className="comment-submit-button">Add Comment</button>
      </form>
    </div>
    {successMessage && <p className="success-message">{successMessage}</p>}
  </div>
  );
};

export default SingleArticle