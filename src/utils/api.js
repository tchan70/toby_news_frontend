import axios from 'axios'

const myApi = axios.create({
  baseURL: 'https://toby-news.onrender.com/api'
}) 

export const getAllTopics = () =>{
  return myApi.get(`/topics`)
  .then((res) =>{
    return res.data.topics
  })
}

export const getAllArticles = () =>{
  return myApi.get(`/articles`)
  .then((res) =>{
    return res.data.articles
  })
}