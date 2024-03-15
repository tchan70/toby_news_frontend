import { useContext, useEffect, useState } from "react"
import { getAllArticles, patchArticleVotesById } from "../utils/api"
import { Link, useSearchParams } from "react-router-dom"
import  Sorting from "./Sorting.jsx"
import "./css/articles.css"
import VoteContext from "./Vote.jsx"
import useVoteHandler from "./VoteHandler.jsx"
import NotFound from "./NotFound.jsx"

const Articles = () =>{
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState(null)
  const { votes } = useContext(VoteContext)
  const topic = searchParams.get("topic")

  const handleVote = useVoteHandler(setArticles)

  useEffect(() =>{
    setIsLoading(true)
    getAllArticles(topic)
    .then((articles) =>{
      setArticles(articles)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "this is the error")
      setError(err)
    })
  }, [topic])

  if (error) return <NotFound/>

  if (isLoading) return <p>Loading...</p>

  const formatDate = (dateString) =>{
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="articles-container">
      <h2>Articles</h2>
      <Sorting articles={articles} setArticles={setArticles} />
      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article-card">
            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>
              <h4 className="article-topic">{article.topic.charAt(0).toUpperCase() +article.topic.slice(1).toLowerCase()}</h4>
              <img className="article-image" src={article.article_img_url} alt="Article"/>
              <p className="article-date">Posted at: {formatDate(article.created_at)} </p>
              <p className="article-comment-count">Comments: {article.comment_count} </p>
              <p className="article-upvotes">Votes: {article.votes}</p>
              <Link to={`/articles/${article.article_id}`} className="read-more-link">Read More</Link>
            </div>
            <div className="article-actions">
              <button onClick={() => handleVote(article.article_id, 1)} disabled={votes[article.article_id]}>Upvote</button>
              <button onClick={() => handleVote(article.article_id, -1)} disabled={votes[article.article_id]}>Downvote</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles