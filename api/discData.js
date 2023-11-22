import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllBaggedDiscsByBag = (bagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs.json?orderBy="bagId"&equalTo="${bagId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteBaggedDisc = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBaggedDisc = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBaggedDisc = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createBaggedDisc = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllBaggedDiscsByBag, deleteBaggedDisc, getSingleBaggedDisc, updateBaggedDisc, createBaggedDisc,
};
