import { useEffect, useState } from "react"
import { getArticleById, getCommentsByArticleId } from "../utils/api"
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

  return (
    <div className="article-page">
      <div className="article-body">
        <h3 className="article-title">{article.title}</h3>
        <h4 className="article-topic">{article.topic.charAt(0).toUpperCase() + article.topic.slice(1).toLowerCase()}</h4>
        <img src={article.article_img_url} className="article-image" alt={article.title} />
        <p className="article-content">{article.body}</p>
        <p className="article-date">Posted at: {formatDate(article.created_at)}</p>
        <p className="article-votes">upvotes: {article.votes}</p>
      </div>
      {comments && (
        <div className="comments-container">
          {comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p className="comment-body">{comment.body}</p>
              <p className="comment-votes">Upvotes: {comment.votes}</p>
              <p className="comment-date"> {formatDate(comment.created_at)}</p>
              <h5 className="comment-author"> {comment.author}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SingleArticle