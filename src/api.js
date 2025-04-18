import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWZhYjZmYzUyNDU4NThiZDRhZGRiNmVjZTZjNDIzZiIsIm5iZiI6MTc0NDc3ODc2My4wMTUsInN1YiI6IjY3ZmYzNjBiZGU1ZTRkZWM2MmFlOTk3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P2qPg1VRzUOXXGfIAurNS9SmG6aNB4rRfFVqV4CBuog',
};

export async function getTrendingMovies() {
  const response = await axios.get('/trending/movie/day');

  return response.data.results;
}

export async function getSearchTextMovies(query) {
  const params = {
    query,
  };

  const response = await axios.get('/search/movie', { params });

  return response.data.results;
}

export async function getMovieDetails(id) {
  const response = await axios.get(`/movie/${id}`);
  const details = { ...response.data };

  details.poster_path = getImagePath(details.poster_path)

  return details;
}

export async function getMovieCredits(id) {
  const response = await axios.get(`/movie/${id}/credits`);
  const { cast } = { ...response.data };

  cast.forEach(person => {
    person.profile_path = getImagePath(person.profile_path);
  });

  return cast;
}

export async function getMovieReviews(id) {
  const response = await axios.get(`/movie/${id}/reviews`);

  return response.data.results;
}

function getImagePath(fileName) {
  if(!fileName) return ''

  return `https://image.tmdb.org/t/p/w500${fileName}`
}
