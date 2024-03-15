import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import UserContext from './components/User'
import Topics from './components/Topics'
import VoteContext from './components/Vote'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    "username": "tickle122",
    "name": "Tom Tickle",
    "avatar_url": "https://info.teachstone.com/hubfs/blank_avatar.png"
  })

  const [votes, setVotes] = useState({})

  return (
    <div className='App'>
      <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser:setLoggedInUser}}>
      <VoteContext.Provider value={{ votes: votes, setVotes: setVotes}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/articles" element={<Articles/> } />
        <Route path="/articles/:articleId" element={<SingleArticle/> } />
        <Route path="/topics" element={<Topics/> } />
      </Routes>
      </VoteContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
