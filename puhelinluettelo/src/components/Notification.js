const ErrorNotification = ( { message } ) => {
  if ( message === null ) {
    return null;
  }

  return (
      <div style={ errorStyle }>
        { message }
      </div>
  );
};

const SuccessNotification = ( { message } ) => {
  if ( message === null ) {
    return null;
  }

  return (
      <div style={ successStyle }>
        { message }
      </div>
  );
};

const successStyle = {
  background: 'lightgrey',
  color: 'black',
  fontSize: 20,
  borderStyle: 'solid',
  padding: 10,
  margin: 10,
};

const errorStyle = {
  background: 'lightgrey',
  color: 'red',
  fontSize: 20,
  borderStyle: 'solid',
  padding: 10,
  margin: 10,
};

export  {SuccessNotification, ErrorNotification};