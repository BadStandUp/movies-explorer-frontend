const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const fetchMoviesData = async () => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            return Promise.reject(Error('Request failed'));
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
