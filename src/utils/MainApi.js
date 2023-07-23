const BASE_URL = 'https://api.kino.nomoredomains.rocks';

export const getMovies = () => {
    const token = localStorage.getItem('token');
    return fetch(`${BASE_URL}/movies`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
            return response.json();
        });
};


export const addMovie = (movieData) => {
    const token = localStorage.getItem('token');
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            country: movieData.country,
            director: movieData.director,
            duration: movieData.duration,
            year: movieData.year,
            description: movieData.description,
            image: `https://api.nomoreparties.co/${movieData.image.url}`,
            trailerLink: movieData.trailerLink,
            nameRU: movieData.nameRU,
            nameEN: movieData.nameEN,
            thumbnail: `https://api.nomoreparties.co/${movieData.image.formats.thumbnail.url}`,
            movieId: movieData.id,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
            return response.json();
        });
};

export const deleteMovie = (movieId) => {
    const token = localStorage.getItem('token');
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
            return response.json();
        });
};
