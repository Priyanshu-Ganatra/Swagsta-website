const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const signup = async (dataToSend) => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const sendEmailOtp = async (email) => {
    const response = await fetch(`${BASE_URL}/auth/sendotp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }    

    return response.json();
};

export const login = async (loginData) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};


export const logout = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}
