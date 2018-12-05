import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async token => {
  const config = {
    headers: { 'Authorization': `bearer ${token}` }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createNew = async (blog, token) => {
  const config = {
    headers: { 'Authorization': `bearer ${token}` }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, token) => {
  const config = {
    headers: { 'Authorization': `bearer ${token}` }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (blog, token) => {
  const config = {
    headers: { 'Authorization': `bearer ${token}` }
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, createNew, update, remove }