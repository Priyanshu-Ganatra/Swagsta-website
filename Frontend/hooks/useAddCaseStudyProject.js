import { useState } from "react";
import { toast } from "react-hot-toast";
import { addProject as addProjectApi } from "../src/apis/caseStudiesApi";

export default function useAddCaseStudyProject() {
    const [isAdding, setisAdding] = useState(false);

    const addCaseStudyProject = async (formData) => {
        const { projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage } = formData;
        let data
        setisAdding(true);
        try {
            data = await addProjectApi({ projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage });

            toast.success(data.message)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisAdding(false);
        }
        return data
    };

    return { isAdding, addCaseStudyProject };
}