import { useEffect, useState } from "react"
import { getAllArticles } from "../utils/api"


const Articles = () =>{
  const [articles, setArticles] = useState([])

  useEffect(() =>{
    getAllArticles()
    .then((articles) =>{
      setArticles(articles)
    })
    .catch((err) =>{
      console.log(err, "this is the error")
    })
  }, [])

  return (
    <div className="articles-container">
      <h2>Articles</h2>
      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article">
            <h3>{article.title}</h3>
            <h4>{article.topic}</h4>
            <h5>{article.author}</h5>
            <img src={article.article_img_url}/>
            <p>{article.body}</p>
            <p>{article.created_at}</p>
            <p>upvotes: {article.votes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles