import { useState } from "react";
import { toast } from "react-hot-toast";
import { addProject as addProjectApi } from "../src/apis/projectsApi";

export default function useAddStoreProject() {
    const [isAdding, setisAdding] = useState(false);

    const addStoreProject = async (formData) => {
        let data
        setisAdding(true);
        try {
            data = await addProjectApi(formData);

            if(data.success)
                toast.success(data.message)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisAdding(false);
        }
        return data
    };

    return { isAdding, addStoreProject };
}