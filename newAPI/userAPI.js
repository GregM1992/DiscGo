const endpoint = process.env.NEXT_PUBLIC_DATABASE;

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateUser = (id, userData) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getSingleUser, updateUser };
