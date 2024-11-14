import { useState } from "react";
import { toast } from "react-hot-toast";
import { addCreative as addCreativeApi } from "../src/apis/creativesApi";

export default function useAddCreative() {
    const [isAdding, setisAdding] = useState(false);

    const addCreative = async (formData) => {
        if (!validateInputs(formData)) {
            toast.error("Please fill all the fields");
            return
        }

        let data
        setisAdding(true);
        try {
            data = await addCreativeApi(formData);
            toast.success(data.message)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisAdding(false);
        }
        return data
    };

    return { isAdding, addCreative };
}

const validateInputs = (formData) => {
    const { name, profession, title, description, software, tags, profilePicture, coverImage, otherMedia } = formData;

    if (tags.length === 0 || software.length === 0 || otherMedia.length === 0 || !name || !profession || !title || !description || !software || !profilePicture || !coverImage) {
        return false
    }
    return true
}