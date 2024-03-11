import axios from 'axios'

const myApi = axios.create({
  baseURL: 'https://toby-news.onrender.com/api'
}) 

export const getAllArticles = () =>{
  return myApi.get(`/articles`)
  .then((res) =>{
    return res.data.articles
  })
}

export const getArticleById = (article_id) =>{
  return myApi.get(`/articles/${article_id}`)
  .then((res) =>{
    return res.data.article
  })
}

export const getCommentsByArticleId = (article_id) =>{
  return myApi.get(`/articles/${article_id}/comments`)
  .then((res) =>{
    return res.data.comments
  })
}