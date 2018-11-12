const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Martti Tienari',
    number: '040-123456',
    id: 2
  },
  {
    name: 'Arto Järvinen',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Lea Kutvonen',
    number: '040-123456',
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/persons', (req, res) => {
  const generatedId = Math.random() * Number.MAX_SAFE_INTEGER
  const person = req.body
  if(!person.name || !person.number) {
    return res.status(400).end({ error: 'name or number is missing' })
  }
  if(persons.find(existingPerson => existingPerson.name === person.name)) {
    return res.status(400).end({ error: 'person already exists' })
  }

  person.id = generatedId

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const message = `<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
  ${new Date().toISOString()} `
  res.send(message)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})