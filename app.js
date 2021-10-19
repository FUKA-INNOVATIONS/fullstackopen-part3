require( 'dotenv' ).config();
const express = require( 'express' );
const app = express();
app.use( express.json() );
app.use( express.static( 'build' ) );
const morgan = require( 'morgan' );
const cors = require( 'cors' );
app.use( cors() );
const Person = require( './models/person' );
app.use( morgan( ( tokens, req, res ) => {
  return [
    tokens.method( req, res ),
    tokens.url( req, res ),
    tokens.status( req, res ),
    tokens.res( req, res, 'content-length' ), '-',
    tokens[ 'response-time' ]( req, res ), 'ms',
    JSON.stringify( req.body ),
  ].join( ' ' );
} ) );




// Get all persons
app.get( '/api/persons', ( req, res, next ) => {
  Person.find( {} ).then( result => {
    res.json( result );
  } ).catch( err => {
    res.json( {
      info: 'Fetching Persons failed',
      errorMessage: err.message,
    } );
    return next(err)
  } );

} );

// Get person by id
app.get( '/api/persons/:id', ( req, res, next ) => {
  const personId = req.params.id;
  Person.findById( personId ).then( person => {
    person ? res.json(person) : res.status( 404 ).json({message: `Person with ${ personId } not found`}).end();
  } ).catch( err => {
    //res.status( 400 ).json( { info: `malformatted id`, errosMessage: e.message, } ).end();
    return next(err)
  } );

} );

// Create new person
app.post( '/api/persons', ( req, res, next ) => {

  const body = req.body;

  if ( !body.name || !body.number ) return res.status( 400 ).
      json( { message: 'Content is missing.' } ).
      end();

  const newPerson = new Person( {
    name: body.name,
    number: body.number,
  } );

  newPerson.save().then( savedPerson => {
    console.log( 'newPerson.save called' );
    res.json( savedPerson );
    console.log( 'savedPerson returned: ', savedPerson );
  } ).catch( err => {
    res.json( {
      info: 'Saving failed',
      errorMessage: err.message,
    } );
    return next(err)
  } );

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

app.put('/api/persons/:id', (req, res, next) => {
  const personId = req.params.id
  const body = req.body

  const editedPerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(personId, editedPerson, { new: true })
  .then(updatedPerson => {
    res.json(updatedPerson)
  })
  .catch(error => next(error))
})

// Delete person by id
app.delete( '/api/persons/:id', ( req, res, next ) => {
  const personId = req.params.id

  Person.findByIdAndRemove(personId).then(result => {
    if(result !== null) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  }).catch(err => next(err))
} );

// Get total amount of phone book entries
app.get( '/info', ( req, res ) => {
  const timeStamp = Date();
  const personsCount = Person.find({}).then(persons => res.send( `<p>Phone book has info of ${ persons.length } people</p><p>${ timeStamp }</p>` ))
} );


const unknownEndpoint = (request, response) => {response.status(404).send({ error: 'unknown endpoint' })}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error('error handler', error.message)
  if (error.name === 'CastError') {return response.status(400).send({ error: 'malformatted id' })}
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen( PORT, () => {
  console.log( `Server running on port ${ PORT }` );
} );
