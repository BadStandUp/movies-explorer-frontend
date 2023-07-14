const BASE_URL = '//localhost:3000';

const makePromise = async (url, method, body) => {
    return await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`},
        body,
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

export const getMovies = async () => {
  return await makePromise('/movies', 'GET');
};

export const addMovie = async (data) => {
    return await makePromise('/movies', 'POST', JSON.stringify({
      country: `${data.country}`,
      director: `${data.director}`,
      duration: `${data.duration}`,
      year: `${data.year}`,
      description: `${data.description}`,
      image: `${data.image}`,
      trailerLink: `${data.trailerLink}`,
      thumbnail: `${data.thumbnail}`,
      movieId: `${data.id}`,
      nameRU: `${data.nameRU}`,
      nameEN: `${data.nameEN}`,
  }));
}

export const deleteMovie = async (movieId) => {
    return await makePromise('/movies' + movieId, 'PATCH')
}

export const updateUser = async (name, email) => {
    return await makePromise('/users/me', 'PATCH', JSON.stringify({name, email}));
};