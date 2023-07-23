const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const fetchMoviesData = () => {
    return fetch(`${BASE_URL}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(Error('Request failed'));
            }
            return response.json();
        })
};

