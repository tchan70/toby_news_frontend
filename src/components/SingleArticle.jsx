import { useEffect, useState } from "react"
import { getArticleById, getCommentsByArticleId, patchArticleVotesById } from "../utils/api"
import { useParams } from "react-router-dom"
import "./css/singleArticle.css"

const SingleArticle = () =>{
  const [article, setArticle] = useState({})
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
    return date.toLocaleString()
  }

  
  const addUpvote = (articleId) =>{
    const votes = {inc_votes: 1}
    patchArticleVotesById(votes, articleId)
    .then((updatedArticle) =>{
      setArticle((article) =>
          article.article_id === updatedArticle.article_id ? {...article, votes: updatedArticle.votes} : article
      )
    })
    .catch((err) =>{
      console.log(err, "this is the error")
    })
  }

  const removeUpvote = (articleId) =>{
    const votes = {inc_votes: -1}
    patchArticleVotesById(votes, articleId)
    .then((updatedArticle) =>{
      setArticle((article) =>
          article.article_id === updatedArticle.article_id ? {...article, votes: updatedArticle.votes} : article
      )
    })
    .catch((err) =>{
      console.log(err, "this is the error")
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
        <p className="article-votes">upvotes: {article.votes}</p>
        <div className="article-actions">
          <button onClick={() => addUpvote(article.article_id)}>Upvote</button>
          <button onClick={() => removeUpvote(article.article_id)}>Downvote</button>
        </div>
      </div>
      <hr className="separator" />
      <h3 className="comments-header">Comments</h3>
      {comments && (
        <div className="comments-container">
          {comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p className="comment-body">{comment.body}</p>
              <p className="comment-votes">Upvotes: {comment.votes} </p>
              <p className="comment-date"> {formatDate(comment.created_at)}</p>
              <h5 className="comment-author"> {comment.author}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleArticle