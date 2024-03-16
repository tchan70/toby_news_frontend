import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllArticles } from '../utils/api.js'
import './css/featuredArticles.css'

function FeaturedArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles()
    .then((allArticles) =>{
      const featured = allArticles.slice(0, 3)
      setArticles(featured)
    })
    .catch((err) =>{
      console.log(err, "this is the err")
    })
  }, [])

  console.log(articles)

  return (
    <div className="featured-articles-list">
      {articles.map((article) => (
        <div key={article.article_id} className="featured-article">
            <h3 className="article-title">{article.title}</h3>
            <h4 className="article-topic">{article.topic.charAt(0).toUpperCase() +article.topic.slice(1).toLowerCase()}</h4>
            <img className="article-image" src={article.article_img_url} alt="Article"/>
            <p className="article-comment-count">Comments: {article.comment_count} </p>
            <p className="article-upvotes">Votes: {article.votes}</p>
          <Link to={`/articles/${article.article_id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default FeaturedArticles;
