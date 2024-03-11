import { useEffect, useState } from "react"
import { getAllArticles } from "../utils/api"
import { Link } from "react-router-dom"
import "./css/articles.css"


const Articles = () =>{
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    setIsLoading(true)
    getAllArticles()
    .then((articles) =>{
      setArticles(articles)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "this is the error")
    })
  }, [])

  if (isLoading) return <p>Loading...</p>

  const formatDate = (dateString) =>{
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="articles-container">
      <h2>Articles</h2>
      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article-card">
            <Link to={`/articles/${article.article_id}`} className="article-link">
              <div className="article-content">
                <h3 className="article-title">{article.title}</h3>
                <h4 className="article-topic">{article.topic.charAt(0).toUpperCase() + article.topic.slice(1).toLowerCase()}</h4>
                <img className="article-image" src={article.article_img_url} alt="Article" />
                <p className="article-date">Posted at: {formatDate(article.created_at)}</p>
                <p className="article-comment-count">Comments: {article.comment_count}</p>
                <p className="article-votes">Upvotes: {article.votes}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles