const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const addNewCollection = async (formData) => {
    const response = await fetch(`${BASE_URL}/profile/collections/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getCollections = async (userId) => {
    const response = await fetch(`${BASE_URL}/profile/collections/ofUser/${userId}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

export const removeFromCollection = async (creativeId, collectionId) => {
    const response = await fetch(`${BASE_URL}/profile/collections/remove/${creativeId}/from/${collectionId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

export const deleteCollection = async (collectionId) => {
    const response = await fetch(`${BASE_URL}/profile/collections/delete/${collectionId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}