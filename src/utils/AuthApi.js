const BASE_URL = 'https://api.kino.nomoredomains.rocks';

export const signin = async (email, password) => {
    const response = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    const { token } = await response.json();
    localStorage.setItem('token', token);
};

export const signup = async (name, email, password) => {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    const { token } = await response.json();
    localStorage.setItem('token', token);
};

export const fetchUserData = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

export const updateProfile = (name, email) => {
    const token = localStorage.getItem('token');
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        });
};
