import { API } from '../../backend';

export const getProducts = () => {
  return fetch(`${API}/products`, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getImage = (product) => {
  return fetch(`${API}/product/photo/${product._id}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
