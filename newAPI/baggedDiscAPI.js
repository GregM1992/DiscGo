const endpoint = process.env.NEXT_PUBLIC_DATABASE;

const getBaggedDiscsByBagId = (bagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs/${bagId}`, {
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

const getSingleBaggedDiscInfo = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addBaggedDisc = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs`, {
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

const updateBaggedDisc = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteBaggedDisc = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/baggedDiscs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getBaggedDiscsByBagId,
  getSingleBaggedDiscInfo,
  addBaggedDisc,
  updateBaggedDisc,
  deleteBaggedDisc,
};
