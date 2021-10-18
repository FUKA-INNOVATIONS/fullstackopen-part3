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
  personFound ? res.json(personFound) : res.status(400).end()
} );

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