import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateCreative as updateCreativeApi } from "../src/apis/creativesApi";

export default function useUpdateCreative() {
    const [isUpdating, setisUpdating] = useState(false);

    const updateCreative = async (id, dataToUpdate) => {
        setisUpdating(true);
        try {
            const data = await updateCreativeApi(id, dataToUpdate);

            toast.success(data.message)
            return data
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisUpdating(false);
        }
    };

    return { isUpdating, updateCreative };
}