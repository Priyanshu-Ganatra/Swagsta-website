const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllProjects = async () => {
    const response = await fetch(`${BASE_URL}/caseStudies/getAllProjects`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getOneProject = async (id) => {
    const response = await fetch(`${BASE_URL}/caseStudies/get/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

export const addProject = async ({ projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage }) => {
    const response = await fetch(`${BASE_URL}/caseStudies/addProject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};