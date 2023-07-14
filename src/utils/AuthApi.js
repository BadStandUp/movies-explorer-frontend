const BASE_URL = '//localhost:3000';

function getResponse(res) {
    if (!res.ok) {
        return Promise.reject(res.status)
    }
    return res.json()
}

export const signup = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: `POST`,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
    }).then((res) => getResponse(res));
};

export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: `POST`,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
        .then((res) => getResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        });
};

export const getUser = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: `GET`,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => getResponse(res))
        .then((data) => data);
};
