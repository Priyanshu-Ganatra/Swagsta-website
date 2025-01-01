import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateUserData as updateUserDataApi } from "../src/apis/profileApi";

export default function useUpdateUserData() {
    const [isUpdating, setisUpdating] = useState(false);

    const updateUserData = async (formData) => {
        setisUpdating(true);
        try {
            const data = await updateUserDataApi(formData);
            toast.success(data.message)
            return data
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisUpdating(false);
        }
    };

    return { isUpdating, updateUserData };
}