import { useEffect, useState } from "react"
import { getAllArticles } from "../utils/api"
import { Link } from "react-router-dom"


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
          <Link to={`/articles/${article.article_id}`} key={article.article_id} className="article">
          <button>
          <li>
            <h3>{article.title}</h3>
            <h4>{article.topic.charAt(0).toUpperCase() + article.topic.slice(1).toLowerCase()}</h4>
            <img src={article.article_img_url}/>
            <p>Posted at: {formatDate(article.created_at)}</p>
            <p>Upvotes: {article.votes}</p>
          </li>
          </button>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Articles