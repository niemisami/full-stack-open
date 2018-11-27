import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Menu = () => (
  <div style={menuStyle}>
    <NavLink style={navItemStyle} activeStyle={navItemActiveStyle} exact to='/'>Anecdotes</NavLink>&nbsp;
    <NavLink style={navItemStyle} activeStyle={navItemActiveStyle} to='/create'>Create new</NavLink>&nbsp;
    <NavLink style={navItemStyle} activeStyle={navItemActiveStyle} to='/about'>About</NavLink>
  </div>
)
const menuStyle = {
  backgroundColor: '#1565c0',
  color: 'white',
  borderRadius: '4px',
  overflow: 'hidden'
}
const navItemStyle = {
  padding: '1rem',
  display: 'inline-block',
  color: 'white'
}
const navItemActiveStyle = {
  backgroundColor: '#5e92f3'
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul className='list-group'>
      {anecdotes.map(anecdote => (
        <li
          key={anecdote.id}
          className='list-group-item'>
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const AnecdoteDetails = ({ anecdote }) => (
  <div>
    <h1>{anecdote.content} by {anecdote.author}</h1>
  </div>
)

const About = () => (
  <div>
    <Row>
      <Col>
        <h2>About anecdote app</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col className='col-6 col-md-3'>
        <img
          alt='Uncle Bob' src='https://upload.wikimedia.org/wikipedia/commons/e/ee/Robert_Cecil_Martin.png'
          className="img-fluid"
        />
      </Col>
    </Row>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Content</Label>
            <Input name='content' value={this.state.content} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Author</Label>
            <Input name='author' value={this.state.author} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>URL for more info</Label>
            <Input name='info' value={this.state.info} onChange={this.handleChange} />
          </FormGroup>
          <Button color='success'>create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })

    const notification = `A new anecdote ${anecdote.content} created!`
    this.setState({ notification })
    setInterval(() => this.setState({ notification: '' }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />
            {this.state.notification.length > 0 && <p style={notificationStyle}>{this.state.notification}</p>}

            <Row className='my-3'>
              <Col>
                <Route exact path='/' render={() =>
                  <AnecdoteList anecdotes={this.state.anecdotes} />
                } />
                <Route path='/create' render={({ history }) =>
                  <CreateNew
                    history={history}
                    addNew={this.addNew} />} />
                <Route path='/about' render={() => <About />} />
                <Route path='/anecdotes/:id' render={({ match }) =>
                  <AnecdoteDetails
                    anecdote={this.anecdoteById(match.params.id)}
                  />} />
              </Col>
            </Row>
          </div>
        </Router>
        <Footer />
      </Container>
    );
  }
}

const notificationStyle = {
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '4px',
  boxshadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: '#00C853',
  color: 'white',
  fontWeight: 'bold'
}

export default App;
