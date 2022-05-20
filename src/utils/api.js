const getMovies = async (options) => {
  return await fetch('/.netlify/functions/getMovies', {
    method: 'POST',
    body: JSON.stringify(options),
  }).then((res) => res.json());
};

const getDetailMovie = async (options) => {
  return await fetch('/.netlify/functions/getDetailMovie', {
    method: 'POST',
    body: JSON.stringify(options),
  }).then((res) => res.json());
};

export default {
  getMovies,
  getDetailMovie,
};
