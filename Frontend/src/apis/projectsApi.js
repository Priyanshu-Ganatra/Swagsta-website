const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const addProject = async (formData) => {
    const response = await fetch(`${BASE_URL}/projects/add`, {
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

export const likeProject = async (formData) => {
    const response = await fetch(`${BASE_URL}/projects/like`, {
        method: 'PATCH',
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
}

export const addComment = async ({ text, projectId }) => {
    const response = await fetch(`${BASE_URL}/projects/addCommentOn/${projectId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const deleteProject = async (id) => {
    const response = await fetch(`${BASE_URL}/projects/delete/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getAllProjects = async () => {
    const response = await fetch(`${BASE_URL}/projects/getAll`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getOneProject = async (id) => {
    const response = await fetch(`${BASE_URL}/projects/get/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

export const updateProject = async (id, updatedProject) => {
    const response = await fetch(`${BASE_URL}/projects/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};