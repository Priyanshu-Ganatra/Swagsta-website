const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const addCreative = async (creativeData) => {
    const response = await fetch(`${BASE_URL}/creatives/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creativeData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const likeCreative = async (id, username) => {
    const response = await fetch(`${BASE_URL}/creatives/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, username }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

export const deleteCreative = async (id) => {
    const response = await fetch(`${BASE_URL}/creatives/delete/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getAllCreatives = async () => {
    const response = await fetch(`${BASE_URL}/creatives/getAll`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getOneCreative = async (id) => {
    const response = await fetch(`${BASE_URL}/creatives/get/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

export const updateCreative = async (id, updatedCreative) => {
    const response = await fetch(`${BASE_URL}/creatives/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCreative),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};