import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get( baseUrl );
  return request.then( response => response.data );
};

const create = newPerson => {
  const request = axios.post( baseUrl, newPerson );
  return request.then( response => response.data );
};

const deletePerson = personId => {
  const request = axios.delete(`${baseUrl}/${personId}`)
  console.log('return req in App>persons.js: ', request);
  return request
}

const upadateNumber = (id, editedPerson) => {
  const request = axios
      .put(`${baseUrl}/${id}`, editedPerson)
      .then(response => response.data)
      .catch(err => err)
}

export default { getAll, create, deletePerson, upadateNumber };