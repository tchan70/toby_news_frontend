import { Link } from "react-router-dom"

const Header = () =>{
  return(
    <header id="header">
      <h1>Toby's News</h1>
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/articles">Articles | </Link>
        <Link to="/topics">Topics</Link>
      </nav>
    </header>
  )
}

export default Header