import { useState } from "react";
import { toast } from "react-hot-toast";
import { addNewCollection as addNewCollectionApi } from "../src/apis/profileApi";
import { useDispatch } from "react-redux";
import { setAddCollectionAction } from "../features/profile/collectionsSlice";

export default function useAddNewCollection() {
    const [isAdding, setisAdding] = useState(false);
    const dispatch = useDispatch();

    const addNewCollection = async (formData) => {
        setisAdding(true);
        try {
            const data = await addNewCollectionApi(formData);
            const addedCollection = data.newCollection;
            dispatch(setAddCollectionAction(addedCollection));
            toast.success(data.message)
            return data
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisAdding(false);
        }
    };

    return { isAdding, addNewCollection };
}