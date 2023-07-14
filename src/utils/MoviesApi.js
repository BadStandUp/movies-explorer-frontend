const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function getResponse(res) {
    if (!res.ok) {
        return Promise.reject(res.status)
    }
    return res.json()
}

export const getMovies = async () => {
    return await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            getResponse(res)
        })
        .catch(err => {
            console.log(err)
        });
};
