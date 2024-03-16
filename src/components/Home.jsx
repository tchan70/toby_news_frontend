import { Link } from "react-router-dom"
import FeaturedArticles from "./FeaturedArticles"
import "./css/home.css"

const Home = () =>{
  return (
    <main className="home-container">
      <section className="hero">
        <h1>Welcome to Toby's News</h1>
        <p>Explore the latest news on your favorite topics.</p>
      </section>
      <section className="featured-articles">
        <h2>Featured Articles</h2>
        <FeaturedArticles/>
      </section>
      <Link to={`/articles`}>See more articles</Link>
    </main>
  )
}

export default Home