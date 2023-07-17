const BASE_URL = 'http://localhost:3000';

export const getMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movies`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            return Promise.reject(Error('Failed to fetch movies'));
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const addMovie = async (movieData) => {
    try {
        const response = await fetch(`${BASE_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        });
        if (!response.ok) {
            return Promise.reject(Error('Failed to add movie'));
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const deleteMovie = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            return Promise.reject(Error('Failed to delete movie'));
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
