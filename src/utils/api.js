import { API_END_POINT, API_KEY } from '/secret';

const API = `${API_END_POINT}?apikey=${API_KEY}`;

const getMovies = async ({ keyword = '', page = 1 }) => {
  const res = await fetch(`${API}&s=${keyword}&page=${page}`).then((res) =>
    res.json()
  );
  return res;
};

const getDetailMovie = async ({ id = '', full = false }) => {
  const res = await fetch(
    `${API}&i=${id}&plot=${full ? 'full' : 'short'}`
  ).then((res) => res.json());
  return res;
};

export default {
  getMovies,
  getDetailMovie,
};
