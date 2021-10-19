const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//console.log(`ARGS length = ${process.argv.length}: ${process.argv[0]}, ${process.argv[1]}, ${process.argv[2]}, ${process.argv[3]}, ${process.argv[4]}`);

const url =
    `mongodb+srv://fullstack:${password}@cluster0.psqub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${ person.name } ${ person.number }`)
    })
    mongoose.connection.close()
  })

}





/*
Note.find({ important: true }).then(result => {
 // ...
 })
* */