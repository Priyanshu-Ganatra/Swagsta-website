const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getData = async () => {
    const response = await fetch(`${BASE_URL}/contactUs/getData`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const updateData = async ({ address, phoneNumbers, emails }) => {
    const response = await fetch(`${BASE_URL}/contactUs/updateData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, phoneNumbers, emails }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};
