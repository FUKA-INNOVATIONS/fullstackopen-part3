const Persons = ( { persons, handleDelete } ) => {
  return (
      <div className={ 'persons' }>
        { persons.map( person => <p key={ person.name }>{ person.name } ({ person.number })
          <button onClick={ () => handleDelete(person.id, person.name) }>delete</button></p> ) }
      </div>
  );
};

export default Persons;