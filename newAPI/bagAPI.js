const endpoint = process.env.NEXT_PUBLIC_DATABASE;

const getUsersBags = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bags/usersBags/${userId}`, {
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

const getUsersSingleBag = (bagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bags/${bagId}`, {
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

const deleteBagByBagId = (bagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bags/${bagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const createNewBag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bags`, {
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

const updateBagByBagId = (bagId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bags/${bagId}}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getUsersBags, getUsersSingleBag, deleteBagByBagId, createNewBag, updateBagByBagId,
};
