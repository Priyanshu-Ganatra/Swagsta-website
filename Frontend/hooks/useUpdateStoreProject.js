import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateProject as updateProjectApi } from "../src/apis/projectsApi";

export default function useUpdateProject() {
    const [isUpdating, setisUpdating] = useState(false);

    const updateProject = async (id, dataToUpdate) => {
        setisUpdating(true);
        try {
            const data = await updateProjectApi(id, dataToUpdate);

            toast.success(data.message)
            return data
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisUpdating(false);
        }
    };

    return { isUpdating, updateProject };
}