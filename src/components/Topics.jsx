import { useEffect, useState } from "react"
import { getTopics } from "../utils/api"
import { Link } from "react-router-dom"
import "./css/topics.css"


const Topics = () =>{
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    setIsLoading(true)
    getTopics()
    .then((topics) =>{
      setTopics(topics)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "this is the error")
    })
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="topics-container">
      <h2>Topics</h2>
      <ul className="topics-list">
        {topics.map((topic) => (
          <li key={topics.slug} className="topic-card">
            <div className="topic-content">
              <h3 className="topic-name">{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1).toLowerCase()}</h3>
              <p className="topic-description">{topic.description}</p>
              <Link to={`/articles/?topic=${topic.slug}`} className="view-topic-articles-link">View {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1).toLowerCase()} articles</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Topics