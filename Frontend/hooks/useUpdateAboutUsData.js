import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateData as updateDataApi } from "../src/apis/aboutUsApi";

export default function useUpdateAboutUsData() {
    const [isUpdating, setisUpdating] = useState(false);

    const updateAboutUsData = async (text, img, socials, removeImg) => {
        setisUpdating(true);
        try {
            const data = await updateDataApi({ text, img, socials, removeImg });

            toast.success(data.message)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisUpdating(false);
        }
    };

    return { isUpdating, updateAboutUsData };
}