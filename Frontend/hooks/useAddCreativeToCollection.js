import { useState } from "react";
import { toast } from "react-hot-toast";
import { addToCollection as addToCollectionApi } from "../src/apis/creativesApi";

export default function useAddToCollection() {
    const [isAdding, setisAdding] = useState(false);

    const addToCollection = async (creativeId, collectionId) => {
        setisAdding(true);
        try {
            const data = await addToCollectionApi(creativeId, collectionId);
            toast.success(data.message)
            return data
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisAdding(false);
        }
    };

    return { isAdding, addToCollection };
}