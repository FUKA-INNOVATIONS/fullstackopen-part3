import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import peopleService from './servieces/persons';
import {
  SuccessNotification,
  ErrorNotification,
} from './components/Notification';

const App = () => {

  const [ persons, setPersons ] = useState( [] );
  const [ newName, setNewName ] = useState( '' );
  const [ newPhone, setNewPhone ] = useState( '' );

  const [ nameFilter, setNameFilter ] = useState( '' );
  const [ showAll, setShowAll ] = useState( true );

  const [ successMessage, setSuccessMessage ] = useState( null );
  const [ errorMessage, setErrorMessage ] = useState( null );

  const showMessage = ( newMessage, type ) => {
    type === 'success' ? setSuccessMessage( newMessage ) : setErrorMessage(
        newMessage );
    setTimeout( () => {
      setErrorMessage( null );
      setSuccessMessage( null );
    }, 5000 );
  };

  useEffect( () => {
    peopleService.getAll().then( response => {
      setPersons( response );
      //console.log('response in effect: ', response);
    } );
  }, [] );

  const personsToShow = showAll ? persons : persons.filter(
      person => person.name.includes( nameFilter ) );

  const handleNameFilterChange = e => {

    let filterTerm = e.target.value;
    if ( filterTerm.length > 0 ) {
      setShowAll( false );
    } else {
      setShowAll( true );
    }
    setNameFilter( filterTerm );
  };

  // Add name input value to newName state
  const handleNameChange = e => setNewName( e.target.value );

  // Add New phone input value to state
  const handlePhoneChange = e => setNewPhone( e.target.value );

  // Add new person to the list
  const handleAddPerson = ( e ) => {
    e.preventDefault();

    let personExists = false;

    // Check and alert incase name already exists
    persons.forEach( person => {
      if ( person.name.toLowerCase() === newName.toLocaleLowerCase() ) {
        personExists = true;

        // Update number if user entered new number
        if ( newPhone.length !== 0 ) {
          const editedPerson = {
            name: person.name,
            number: newPhone,
          };

          let updateConfirmed = window.confirm(
              `${ person.name } is already added to phonebook, replace the old number with a new one?` );
          if ( updateConfirmed ) {
            peopleService.upadateNumber( person.id, editedPerson );
            setPersons( persons.filter( p => p.id !== person.id ).concat( editedPerson ) );

            showMessage( `${ newName }'s phone number is updated!`, 'success' );
          }
        } else {
          alert(
              `To update the number, Please write a new number` );
        }
      }
    } );

    // Add new person to phonebook
    if ( !personExists ) {

      const newPerson = {
        name: newName,
        number: newPhone,
      }

      peopleService.create( newPerson ).then( response => {
            //console.log(response);
            setPersons( persons.concat(response.data) );
            showMessage( `${ newName }'s phone number is added!`, 'success' );
            //console.log(response);
            setNewName( '' ); setNewPhone( '' );
          }).catch(err => {
        console.log('ERROR message::', err.response.data.error);
        showMessage(`${err.response.data.error}`, 'error')
      })


    }
  };

  const handleDeletePerson = ( personId, personName ) => {

    let deleteConfirmed = window.confirm(
        `Are you sure to delete ${ personName }?` );

    if ( deleteConfirmed ) {
      peopleService.deletePerson( personId )
      .then(response => {
        //console.log('deletePerson response in App.js: ', response);
        //console.log('response status in App.js delete: ', response.status)


        peopleService.getAll().then( response => {
          setPersons( response );
        } );
        showMessage( 'Number successfully deleted', 'success' )
      })
      .catch( e => {
            showMessage( `Information of ${ personName } has already been removed.`, 'error')
        setTimeout(() => {
          peopleService.getAll().then( response => {
            setPersons( response );
          }, 2000 );
        })
          })
    }

  };

  const notificationContent = successMessage
      ? <SuccessNotification message={successMessage} />
      : <ErrorNotification message={errorMessage} />

  return (
      <div style={{margin: 20}} className={ 'main' }>
        { notificationContent }
        <h2>Phonebook</h2>
        <Filter nameFilter={ nameFilter }
                handleChange={ handleNameFilterChange }/>

        <h3>Add a new</h3>
        <PersonForm newName={ newName } newPhone={ newPhone }
                    handleSubmit={ handleAddPerson }
                    handleNameChange={ handleNameChange }
                    handlePhoneChange={ handlePhoneChange }/>

        <h3>Numbers</h3>
        <Persons persons={ personsToShow } handleDelete={ handleDeletePerson }/>
      </div>
  );

};

export default App;