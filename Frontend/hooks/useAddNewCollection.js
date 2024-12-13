import { useState } from "react";
import { toast } from "react-hot-toast";
import { addNewCollection as addNewCollectionApi } from "../src/apis/profileApi";

export default function useAddNewCollection() {
    const [isAdding, setisAdding] = useState(false);

    const addNewCollection = async (formData) => {
        setisAdding(true);
        try {
            const data = await addNewCollectionApi(formData);
            toast.success(data.message)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisAdding(false);
        }
    };

    return { isAdding, addNewCollection };
}