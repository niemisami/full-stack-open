import axios from 'axios'
const baseUrl = '/api/blogs/'

const generateUrl = blog => `${baseUrl}/${blog.id}/comments`

const getAll = async(blog, token) => {
  const config = {
    headers: { 'Authorization': `bearer ${token}` }
  }
  const response = await axios.get(generateUrl(blog), config)
  return response.data
}

const createNew = async(blog, comment, token) => {
  const config = {
    headers: { 'Authorization': `bearer ${token}` }
  }
  const response = await axios.post(generateUrl(blog), comment, config)
  return response.data
}

export default { getAll, createNew }