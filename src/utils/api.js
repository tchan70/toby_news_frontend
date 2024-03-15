import axios from 'axios'

const myApi = axios.create({
  baseURL: 'https://toby-news.onrender.com/api'
}) 

export const getAllArticles = (topic) =>{
  const url = topic ? `/articles?topic=${topic}` : `/articles`
  return myApi.get(url)
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

export const patchArticleVotesById = (votes, article_id) =>{
  return myApi.patch(`/articles/${article_id}`, votes)
  .then((res) =>{
    return res.data.article
  })
}

export const postCommentByArticleId = (comment, article_id) =>{
  return myApi.post(`/articles/${article_id}/comments`, comment)
  .then((res) =>{
    return res.data.comment
  })
}

export const deleteCommentById = (comment_id) =>{
  return myApi.delete(`/comments/${comment_id}`)
}

export const getTopics = () =>{
  return myApi.get(`/topics`)
  .then((res) =>{
    return res.data.topics
  })
}