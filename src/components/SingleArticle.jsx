import { useContext, useEffect, useState } from "react"
import { getArticleById, patchArticleVotesById} from "../utils/api"
import { useParams } from "react-router-dom"
import "./css/singleArticle.css"
import Comments from "./Comments"
import VoteContext from "./Vote"
import useVoteHandler from "./VoteHandler"

const SingleArticle = () => {
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { votes } = useContext(VoteContext)
  let { articleId } = useParams()

  const handleVote = useVoteHandler(setArticle, true)

  useEffect(() => {
    Promise.all([getArticleById(articleId)]).then(([article]) => {
      setArticle(article)
      setIsLoading(false)
    })
  }, [articleId])

  if (isLoading) return <p>Loading...</p>

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="article-page">
      <div className="article-body">
        <h3 className="article-title">{article.title}</h3>
        <h4 className="article-topic">{article.topic.charAt(0).toUpperCase() + article.topic.slice(1).toLowerCase()}</h4>
        <img src={article.article_img_url} className="article-image" alt={article.title} />
        <p className="article-content">{article.body}</p>
        <p className="article-date">Posted at: {formatDate(article.created_at)}</p>
        <p className="article-votes">Upvotes: {article.votes}</p>
        <p className="article-author">Posted by: {article.author}</p>
        <div className="article-actions">
        <button onClick={() => handleVote(articleId, 1)} disabled={votes[articleId]}>Upvote</button>
        <button onClick={() => handleVote(articleId, -1)} disabled={votes[articleId]}>Downvote</button>
        </div>
      </div>
      <hr className="separator" />
      <Comments articleId={articleId} />
    </div>
  )
}

export default SingleArticle