require('dotenv').config()
const express = require( 'express' );
const morgan = require( 'morgan' );
const cors = require('cors')
const app = express();
app.use( express.json() );
const Person = require('./models/person')
app.use(cors())
app.use(express.static('build'))
app.use( morgan( ( tokens, req, res ) => {
  return [
    tokens.method( req, res ),
    tokens.url( req, res ),
    tokens.status( req, res ),
    tokens.res( req, res, 'content-length' ), '-',
    tokens[ 'response-time' ]( req, res ), 'ms',
    JSON.stringify(req.body),
  ].join( ' ' );
} ) );


// Get all persons
app.get( '/api/persons', ( req, res ) => {
  Person.find({}).then(result => {
    res.json(result)
  }).catch(err => {
    res.json({
      info: 'Fetching Persons failed',
      errorMessage: err.message
    })
  })

  /*res.json( persons );*/
} );

// Get person by id
app.get( '/api/persons/:id', ( req, res ) => {

  const personId = req.params.id;
  const findPerson = Person.findById(personId).then(person => {
    res.json(person)
  }).catch(e => {
    res.json({
      info: `Person with ${personId} not found`,
      errosMessage: e.message
    })
  })


} );

// Create new person
app.post( '/api/persons', ( req, res ) => {

  const body = req.body

  if ( !body.name || !body.number ) return res.status( 400 ).
      json( { message: 'Content is missing.' } ).
      end();

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save().then(savedPerson => {
    console.log('newPerson.save called');
    res.json(savedPerson)
    console.log('savedPerson returned: ', savedPerson);
  }).catch(err => {
    res.json({
      info: 'Saving failed',
      errorMessage: err.message
    })
  })

  /*// Todo: Pervent duplicated ids
  const generateNewId = Math.floor( Math.random() * 900000000000 ) + 1;
  const body = req.body;

  if ( !body.name || !body.number ) return res.status( 400 ).
      json( { message: 'Content is missing.' } ).
      end();

  // Check for existing number
  const nameExists = persons.filter(
      person => person.name.toLowerCase() === body.name.toLowerCase() );
  if ( nameExists.length > 0 ) return res.status( 403 ).
      json( { message: 'name must be unique' } );

  const newPerson = {
    id: generateNewId,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat( newPerson );
  res.json( persons ); */

} );

// Delete person by id
app.delete( '/api/persons/:id', ( req, res ) => {
  const personId = Number( Math.trunc( req.params.id ) );
  personId
      ? personFound = persons.find( person => person.id === personId )
      : res.status( 400 ).json( { message: 'Id should be intiger' } );
  if ( personFound ) {
    persons = persons.filter( person => person.id !== personId );
    res.status( 204 ).end();
  } else {
    res.status( 404 ).
        json( { message: `Person with id ${ personId } not found` } );
  }
} );

// Get total amount of phone book entries
app.get( '/info', ( req, res ) => {
  const timeStamp = Date();
  const personsCount = persons.length;
  res.send(
      `<p>Phone book has info of ${ personsCount } people</p><p>${ timeStamp }</p>` );
} );

const PORT = process.env.PORT || 3001;
app.listen( PORT, () => {
  console.log( `Server running on port ${ PORT }` );
} );

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-324234324',
  },
  {
    id: 3,
    name: 'Dan Sukunimi',
    number: '045-3424324',
  },
  {
    id: 4,
    name: 'Aary Monroes',
    number: '044-23423423',
  },
];