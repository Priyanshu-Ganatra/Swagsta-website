const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getData = async () => {
    const response = await fetch(`${BASE_URL}/aboutUs/getData`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const updateData = async ({ text, socials, img, removeImg }) => {
    const response = await fetch(`${BASE_URL}/aboutUs/updateData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, socials, img, removeImg }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};
