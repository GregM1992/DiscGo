import { clientCredentials } from '../utils/client';

const extEndpoint = clientCredentials.extDatabaseURL;

const getDiscDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${extEndpoint}/disc/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

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

const getDiscsByName = (name) => new Promise((resolve, reject) => {
  fetch(`${extEndpoint}/disc?name=${name}`, {
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

const getDiscsByBrand = (brand) => new Promise((resolve, reject) => {
  fetch(`${extEndpoint}/disc?brand=${brand}`, {
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

const getDiscsByStability = (stability) => new Promise((resolve, reject) => {
  fetch(`${extEndpoint}/disc?stability=${stability}`, {
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

const getDiscsByCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${extEndpoint}/disc?category=${category}`, {
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

const searchDiscsByName = (searchValue) => new Promise((resolve, reject) => {
  getAllDiscs().then((discArray) => {
    const searchResults = discArray.filter((disc) => (
      disc.name.toLowerCase().includes(searchValue)
    ));
    resolve(searchResults);
  }).catch(reject);
});

const searchDiscsByBrand = (searchValue, brand) => new Promise((resolve, reject) => {
  getDiscsByBrand(brand).then((discArray) => {
    const searchResults = discArray.filter((disc) => (
      disc.brand.toLowerCase().includes(searchValue)
    ));
    resolve(searchResults);
  }).catch(reject);
});

const searchDiscsByCategory = (searchValue, category) => new Promise((resolve, reject) => {
  getDiscsByCategory(category).then((discArray) => {
    const searchResults = discArray.filter((disc) => (
      disc.category.toLowerCase().includes(searchValue)
    ));
    resolve(searchResults);
  }).catch(reject);
});

const searchDiscsByStability = (searchValue, stability) => new Promise((resolve, reject) => {
  getDiscsByStability(stability).then((discArray) => {
    const searchResults = discArray.filter((disc) => (
      disc.stability.toLowerCase().includes(searchValue)
    ));
    resolve(searchResults);
  }).catch(reject);
});

export {
  getDiscDetails, getAllDiscs, getDiscsByName, getDiscsByBrand, getDiscsByStability, getDiscsByCategory, searchDiscsByName, searchDiscsByBrand, searchDiscsByCategory, searchDiscsByStability,
};
