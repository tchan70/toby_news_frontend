import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import UserContext from './components/User'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    "username": "tickle122",
    "name": "Tom Tickle",
    "avatar_url": "https://info.teachstone.com/hubfs/blank_avatar.png"
  })

  const [hasVoted, setHasVoted] = useState(false)
  return (
    <div className='App'>
      <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser:setLoggedInUser}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/articles" element={<Articles hasVoted={hasVoted} setHasVoted={setHasVoted} />} />
        <Route path="/articles/:articleId" element={<SingleArticle hasVoted={hasVoted} setHasVoted={setHasVoted} />} />
      </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
