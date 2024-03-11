import { useEffect, useState } from "react"
import { getArticleById } from "../utils/api"
import { useParams } from "react-router-dom"


const SingleArticle = () =>{
  const [article, setArticle] = useState({})
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
  },[articleId])

  if (isLoading) return <p>Loading...</p>

  const formatDate = (dateString) =>{
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div>
      <h3>{article.title}</h3>
      <h4>{article.topic.charAt(0).toUpperCase() + article.topic.slice(1).toLowerCase()}</h4>
      <img src={article.article_img_url}/>
      <p>{article.body}</p>
      <p>Posted at: {formatDate(article.created_at)}</p>
      <p>upvotes: {article.votes}</p>
    </div>
  )
}

export default SingleArticle