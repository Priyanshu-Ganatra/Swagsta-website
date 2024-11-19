import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateProject as updateProjectApi } from "../src/apis/caseStudiesApi";

export default function useUpdateCaseStudyProject() {
    const [isUpdating, setisUpdating] = useState(false);

    const updateCaseStudyProject = async (id, { projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage }) => {
        setisUpdating(true);
        try {
            const data = await updateProjectApi(id, { projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage });

            toast.success(data.message)
            return data
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisUpdating(false);
        }
    };

    return { isUpdating, updateCaseStudyProject };
}