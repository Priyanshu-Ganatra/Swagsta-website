const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const addCreative = async (creativeData) => {
    const response = await fetch(`${BASE_URL}/creative/add`, {
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

export const addComment = async ({ text, creativeId }) => {
    const response = await fetch(`${BASE_URL}/creative/addCommentOn/${creativeId}`, {
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

// export const likeProject = async (id, username) => {
//     const response = await fetch(`${BASE_URL}/projects/like`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, username }),
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//     }

//     return response.json();
// }

// export const deleteProject = async (id) => {
//     const response = await fetch(`${BASE_URL}/projects/delete/${id}`, {
//         method: 'DELETE',
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//     }

//     return response.json();
// };

export const getAllCreatives = async () => {
    const response = await fetch(`${BASE_URL}/creative/getAll`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getOneCreative = async (id) => {
    const response = await fetch(`${BASE_URL}/creative/get/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

// export const updateProject = async (id, updatedProject) => {
//     const response = await fetch(`${BASE_URL}/projects/update/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedProject),
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//     }

//     return response.json();
// };