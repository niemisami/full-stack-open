import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filter: ''
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/persons')
    .then(response => this.setState({persons: response.data}))
  }
  
  addContact = event => {
    event.preventDefault()
    const { newName, newPhonenumber, persons } = this.state
    if(this.nameExists(newName)) {
      alert('Yhteystieto on jo olemassa')
      return
    }
    const newContact = {
      name: newName,
      phonenumber: newPhonenumber
    }
    this.setState({ persons: persons.concat(newContact) })
  }

  handleInputChange = field => event => {
    const newValue = event.target.value
    this.setState({
      [field]: newValue
    })
  }

  filterContactList = person => person.name.toLowerCase().includes(this.state.filter.toLowerCase())
  nameExists = name => this.state.persons.find(person => person.name.toLowerCase() === name.toLowerCase())

  render() {
    const { filter } = this.state
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          <label htmlFor='filter' >Rajaa näytettäviä: </label>
          <input
            name='filter'
            value={filter}
            onChange={this.handleInputChange('filter')} />
        </div>
        <ContactForm
          onSubmit={this.addContact}
          onInputChange={this.handleInputChange}
        />
        <ContactList contacts={this.state.persons.filter(this.filterContactList)} />
      </div >
    )
  }
}

const ContactForm = ({ onSubmit, onInputChange, newName, newPhonenumber }) =>
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
        <label htmlFor='phonenumber' >Puhelinnumero: </label>
        <input
          name='phonenumber'
          value={newPhonenumber}
          onChange={onInputChange('newPhonenumber')} />
      </div>
      <button type="submit">Tallenna</button>
    </form>
  </>

const ContactList = ({ contacts }) => (
  <>
    <h2>Numerot</h2>
    {contacts.map(contact =>
      <Contact key={contact.name} contact={contact} />
    )}
  </>
)

const Contact = ({ contact }) => <p>{contact.name} {contact.phonenumber}</p>

export default App