import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get( baseUrl );
  return request.then( response => response.data );
};

const create = newPerson => {
  const request = axios.post( baseUrl, newPerson );
  return request
};

const deletePerson = personId => {
  const request = axios.delete(`${baseUrl}/${personId}`)
  return request
}

// eslint-disable-next-line
const upadateNumber = (id, updatedPerson) => {
  // eslint-disable-next-line
  const request = axios
      .put(`${baseUrl}/${id}`, updatedPerson)
      .then(response => response.data)
      .catch(err => err)
}
// eslint-disable-next-line
export default { getAll, create, deletePerson, upadateNumber };