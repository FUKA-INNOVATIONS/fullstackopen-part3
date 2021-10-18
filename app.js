const express = require( 'express' );
const app = express();
app.use( express.json() );

// Get all persons
app.get( '/api/persons', ( req, res ) => {
  res.json( persons );
} );

// Get person by id
app.get( '/api/persons/:id', ( req, res ) => {
  const personId = Number(req.params.id)
  const personFound = persons.find(person => person.id === personId );
  personFound ? res.json(personFound) : res.status(404).json({message: 'Person not found'}).end()
} );

// Create new person
app.post('/api/persons', (req, res) => {
  // Todo: Pervent duplicated ids
  const generateNewId = Math.floor(Math.random() * 900000000000) +1
  const body = req.body

  if (!body.name || !body.number) return res.status(400).json({message: 'Content is missing.'}).end()

  // Check for existing number
  const nameExists = persons.filter(person => person.name.toLowerCase() === body.name.toLowerCase())
  if (nameExists.length > 0) return res.status(403).json({message: 'name must be unique'})

  const newPerson = {
    id: generateNewId,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.json(persons)

})

// Delete person by id
app.delete( '/api/persons/:id', ( req, res ) => {
  const personId = Number(Math.trunc(req.params.id))
  personId ?  personFound = persons.find(person => person.id === personId ) : res.status(400).json({message: 'Id should be intiger'})
  if (personFound) {
    persons.filter(person => person.id !== personId)
    res.status(204).end()
  } else {
    res.status(400).json({message: `Person with id ${personId} not found`})
  }
} );

// Get total amount of phone book entries
app.get( '/info', ( req, res ) => {
  const timeStamp = Date();
  const personsCount = persons.length;
  res.send(`<p>Phone book has info of ${personsCount} people</p><p>${timeStamp}</p>`)
} );


const PORT = 3001;
app.listen( PORT, () => {
  console.log( `Server running on port ${ PORT }` );
} );

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-324234324'
  },
  {
    id: 3,
    name: 'Dan Sukunimi',
    number: '045-3424324'
  },
  {
    id: 4,
    name: 'Aary Monroes',
    number: '044-23423423'
  }
];