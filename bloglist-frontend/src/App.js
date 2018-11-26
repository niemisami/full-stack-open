import React from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import storageService from './services/storage'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification, { notificationTypes } from './components/Notification'

class App extends React.Component {
  state = {
    blogs: [],
    user: null,
    loginUser: {
      username: '',
      password: ''
    },
    notificationMessage: null,
    notificationType: null
  }

  async componentDidMount() {
    try {

      const blogs = await blogService.getAll()
      this.setState({ blogs })

      const loggedUserJson = storageService.getItem('user')
      if(loggedUserJson) {
        const user = JSON.parse(loggedUserJson)
        this.setState({ user })
        blogService.setToken(user.token)
      }
    } catch(error) {
      this.addNotification(error.message, notificationTypes.ERROR)
    }
  }

  handleLoginInputChange = event => {
    this.setState({
      loginUser: {
        ...this.state.loginUser,
        [event.target.name]: event.target.value
      }
    })
  }

  handleLogin = async event => {
    event.preventDefault()
    const { loginUser } = this.state
    try {
      const user = await loginService.login(loginUser)
      this.setState({ user, login: { username: '', password: '' } })
      storageService.setItem('user', user)

      blogService.setToken(user.token)
      this.addNotification(`${user.name} successfully logged in`)

    } catch(exception) {
      this.addNotification(`Wrong username or password`, notificationTypes.ERROR)
      storageService.removeItem('user')
    }
  }

  handleBlogSubmit = async newBlog => {
    try {
      const blog = await blogService.createNew(newBlog)
      this.setState({ blogs: this.state.blogs.concat(blog) })
      this.addNotification(`Successfully added blog ${blog.title} `)
    } catch(error) {
      this.addNotification(error.message, notificationTypes.ERROR)
    }
  }

  handleLogOut = () => {
    this.setState({ user: null })
  }

  addNotification = (message, notificationType = notificationTypes.NORMAL) => {
    console.log(message, notificationType)
    this.setState({ notificationMessage: message, notificationType })
    setTimeout(() => this.setState(() => ({ notificationMessage: null, notificationType: null })), 5000)
  }

  handleLikeClick = async blog => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user._id
      })
      this.setState({
        blogs: this.state.blogs
          .filter(blog => blog.id !== updatedBlog.id)
          .concat(updatedBlog)
      })
    } catch(error) {
      this.addNotification(error.message, notificationTypes.ERROR)

    }
  }

  handelRemoveClick = async removedBlock => {
    try {
      await blogService.remove(removedBlock)
      this.setState({
        blogs: this.state.blogs
          .filter(blog => blog.id !== removedBlock.id)
      })
    } catch(error) {
      this.addNotification(error.message, notificationTypes.ERROR)
    }
  }

  sortByLikes = blogs => blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

  render() {
    const { user, username, password, blogs, notificationMessage, notificationType } = this.state
    return (
      <div>
        <Notification message={notificationMessage} notificationType={notificationType} />
        {user !== null
          ? <>
            <h1 className='header'>Blogs</h1>
            <h2>blogs</h2>
            {`${user.name} logged in`} <button onClick={this.handleLogOut}>Log out</button>
            <BlogForm onSubmit={this.handleBlogSubmit} />
            <BlogList
              blogs={this.sortByLikes(blogs)}
              onLikeClick={this.handleLikeClick}
              onRemoveClick={this.handelRemoveClick}
            />
          </>
          : <LoginForm
            onSubmit={this.handleLogin}
            onInputChange={this.handleLoginInputChange}
            username={username}
            password={password}
          />

        }
      </div>
    )
  }
}

export default App;
