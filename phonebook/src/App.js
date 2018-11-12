import React, { Component } from 'react';
import personService from './services/persons'
import Notification, { notificationTypes } from './components/Notification'
import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filter: '',
      notificationMessage: null,
      notificationType: null
    }
  }

  componentDidMount = () => {
    personService.getAll()
      .then(persons => this.setState({ persons }))
  }

  addPerson = event => {
    event.preventDefault()
    const { newName, newPhonenumber } = this.state
    let replacePerson = false
    const existingUser = this.nameExists(newName)
    if(existingUser) {
      replacePerson = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
      if(!replacePerson) {
        return
      }
    }
    const newPerson = {
      name: newName,
      number: newPhonenumber
    }
    const serviceFunction = replacePerson
      ? personService.update(existingUser.id, newPerson)
      : personService.create(newPerson)

    serviceFunction
      .then(person => {
        this.setState(prevState => {
          const newArray = replacePerson
            ? this.updateItem(person)
            : prevState.persons.concat(person)
          return { persons: newArray }
        })
        const notificationBase = replacePerson ? 'Päivitettiin ' : 'Lisättiin '
        this.addNotification(notificationBase + person.name)
      })
      .catch(err => {
        this.addNotification('Yhteystiedon lisääminen epäonnistui', notificationTypes.ERROR)
      })
  }

  removePerson = personId => () => {
    const personToRemove = this.findPerson(personId)
    if(!window.confirm(`Oletko varma, että haluat poistaa kontaktin ${personToRemove.name}`)) {
      return
    }
    personService.remove(personId)
      .then(() => {
        this.setState(prevState => ({ persons: prevState.persons.filter(person => person.id !== personId) }))
        this.addNotification(`Poistettiin ${personToRemove.name}`)
      })
      .catch(err => {
        if(err.response.status === 404) {
          this.addNotification('Kontaktin on poistettu palvelimelta', notificationTypes.ERROR)
          return this.setState(prevState => ({ persons: prevState.persons.filter(person => person.id !== personId) }))
        }
        this.addNotification('Kontaktin poistaminen epäonnistui', notificationTypes.ERROR)
      })
  }

  addNotification = (message, notificationType = notificationTypes.NORMAL) => {
    this.setState({ notificationMessage: message, notificationType })
    setTimeout(() => this.setState(() => ({ notificationMessage: null, notificationType: null })), 3000)
  }

  filterPersonList = person => person.name.toLowerCase().includes(this.state.filter.toLowerCase())
  findPerson = id => this.state.persons.find(person => person.id === id)
  nameExists = name => this.state.persons.find(person => person.name.toLowerCase() === name.toLowerCase())
  updateItem = newPerson => {
    const { persons } = this.state
    const index = persons.indexOf(persons.find(person => person.id === newPerson.id))
    return [
      ...persons.slice(0, index),
      newPerson,
      ...persons.slice(index + 1)
    ]
  }
  render() {
    const { filter, notificationMessage, notificationType } = this.state
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={notificationMessage} notificationType={notificationType} />
        <div>
          <label htmlFor='filter' >Rajaa näytettäviä: </label>
          <input
            name='filter'
            value={filter}
            onChange={this.handleInputChange('filter')} />
        </div>
        <PersonForm
          onSubmit={this.addPerson}
          onInputChange={this.handleInputChange}
        />
        <PersonList
          persons={this.state.persons.filter(this.filterPersonList)}
          onClickButton={this.removePerson}
        />
      </div >
    )
  }

  handleInputChange = field => event => {
    const newValue = event.target.value
    this.setState({
      [field]: newValue
    })
  }
}

const PersonForm = ({ onSubmit, onInputChange, newName, newPhonenumber }) =>
  <>
    <h2>Lisää uusi</h2>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='name' >Nimi: </label>
        <input
          name='name'
          value={newName}
          onChange={onInputChange('newName')} />
      </div>
      <div>
        <label htmlFor='number' >Puhelinnumero: </label>
        <input
          name='number'
          value={newPhonenumber}
          onChange={onInputChange('newPhonenumber')} />
      </div>
      <button type="submit">Tallenna</button>
    </form>
  </>

const PersonList = ({ persons, onClickButton }) => (
  <>
    <h2>Numerot</h2>
    {persons.map(person =>
      <Person
        key={person.id}
        person={person}
        onClickButton={onClickButton}
      />
    )}
  </>
)

const Person = ({ person, onClickButton }) =>
  <div>
    <p>{person.name} {person.number}
      <button onClick={onClickButton(person.id)} >Poista</button>
    </p>
  </div>

export default App