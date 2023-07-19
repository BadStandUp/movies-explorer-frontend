const BASE_URL = 'https://api.kino.nomoredomains.rocks';

export const signin = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            return Promise.reject(Error('Login failed'));
        }
        const { token } = await response.json();
        localStorage.setItem('token', token);
        console.log('Login successful');
    } catch (error) {
        console.error(error);
    }
};

export const signup = async (name, email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            return Promise.reject(Error('Registration failed'));
        }
        const { token } = await response.json();
        localStorage.setItem('token', token);
        console.log('Registration successful');
    } catch (error) {
        console.error(error);
    }
};

export const fetchUserData = async () => {
    try {
        return await fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const updateProfile = async (name, email) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email }),
        });
        if (!response.ok) {
            return Promise.reject(Error('Failed to update profile'));
        }
        console.log('Profile updated successfully');
    } catch (error) {
        console.error(error);
    }
};
