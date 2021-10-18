const PersonForm = props => {
  return (
      <div className={'personForm'}>
        <form onSubmit={ props.handleSubmit }>
          <div>
            name: <input value={ props.newName } onChange={ props.handleNameChange }/>
          </div>
          <div>
            phone: <input value={ props.newPhone } onChange={ props.handlePhoneChange }/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
  );

};

export default PersonForm;