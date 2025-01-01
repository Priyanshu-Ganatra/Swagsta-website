const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const updateUserData = async (formData) => {
    const response = await fetch(`${BASE_URL}/profile/data/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
    }

    return response.json();
}

export const addNewCollection = async (formData) => {
    const response = await fetch(`${BASE_URL}/profile/collections/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
    }

    return response.json();
};

export const getCollections = async () => {
    const response = await fetch(`${BASE_URL}/profile/collections`, {
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
    }

    return response.json();
}

export const removeFromCollection = async (creativeId, collectionId) => {
    const response = await fetch(`${BASE_URL}/profile/collections/remove/${creativeId}/from/${collectionId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
    }

    return response.json();
}

export const deleteCollection = async (collectionId) => {
    const response = await fetch(`${BASE_URL}/profile/collections/delete/${collectionId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
    }

    return response.json();
}