import { clientCredentials } from '../utils/client';

const extEndpoint = clientCredentials.extDatabaseURL;

const getAllDiscs = () => new Promise((resolve, reject) => {
  fetch(`${extEndpoint}/disc`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve((data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getAllDiscs;
