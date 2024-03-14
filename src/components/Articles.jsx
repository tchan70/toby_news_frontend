import { useEffect, useState } from "react"
import { getAllArticles, patchArticleVotesById } from "../utils/api"
import { Link, useSearchParams } from "react-router-dom"
import "./css/articles.css"


const Articles = ({ hasVoted, setHasVoted }) =>{
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const topic = searchParams.get("topic")

  useEffect(() =>{
    setIsLoading(true)
    getAllArticles(topic)
    .then((articles) =>{
      setArticles(articles)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "this is the error")
    })
  }, [topic])

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
        setArticles((articles) =>
          articles.map((article) =>
            article.article_id === updatedArticle.article_id ? {...article, votes: updatedArticle.votes} : article
          )
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
        setArticles((articles) =>
          articles.map((article) =>
            article.article_id === updatedArticle.article_id ? {...article, votes: updatedArticle.votes} : article
          )
        )
        setHasVoted(true)
      })
      .catch((err) =>{
        console.log(err, "this is the error")
      })
    }
  }


  return (
    <div className="articles-container">
      <h2>Articles</h2>
      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article-card">
            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>
              <h4 className="article-topic">{article.topic.charAt(0).toUpperCase() +article.topic.slice(1).toLowerCase()}</h4>
              <img className="article-image" src={article.article_img_url} alt="Article"/>
              <p className="article-date">Posted at: {formatDate(article.created_at)} </p>
              <p className="article-comment-count">Comments: {article.comment_count} </p>
              <p className="article-upvotes">Upvotes: {article.votes}</p>
              <Link to={`/articles/${article.article_id}`} className="read-more-link">Read More</Link>
            </div>
            <div className="article-actions">
              <button onClick={() => addUpvote(article.article_id)} disabled={hasVoted}>Upvote</button>
              <button onClick={() => removeUpvote(article.article_id)} disabled={hasVoted}>Downvote</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles