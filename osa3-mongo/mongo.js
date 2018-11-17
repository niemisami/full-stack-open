require('dotenv').config()
const mongoose = require('mongoose')

const args = process.argv
const url = process.env.DB_URI
mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if(args.length == 2) {
  Person.find({})
    .then(people => {
      console.log('puhelinluettelo:')
      people.forEach(person => console.log(`${person.name} ${person.number}`))
      mongoose.connection.close()
    })
} else if(args.length === 4) {

  const person = new Person({
    name: args[2],
    number: args[3]
  })

  person
    .save()
    .then(response => {
      console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
      mongoose.connection.close()
    })
} else {
  console.log('Anna 0 tai 2 parametria')
  mongoose.connection.close()
}