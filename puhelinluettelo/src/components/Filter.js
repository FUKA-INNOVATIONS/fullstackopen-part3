const Filter = ( { nameFilter, handleChange } ) => {
  return (
      <div className={'filter'}>
        Filter shown with: <input value={ nameFilter } onChange={ handleChange }/>
      </div>
  );
};

export default Filter;