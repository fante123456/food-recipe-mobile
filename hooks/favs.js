let favorites = [];
let status = false;

export const getFav = () => {
  return favorites;
};
export const setFav = (params) => {
  status = true;
  favorites = params;
};

export const getStatus = () => {
  return status;
};
