import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateData as updateDataApi } from "../src/apis/contactUsApi";

export default function useUpdateContactUsData() {
    const [isUpdating, setisUpdating] = useState(false);

    const updateContactUsData = async (address, phoneNumbers, emails) => {
        const success = handleInputErrors(address, phoneNumbers, emails)
        if (!success) return

        setisUpdating(true);
        try {
            const data = await updateDataApi({ address, phoneNumbers, emails });

            toast.success(data.message)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisUpdating(false);
        }
    };

    return { isUpdating, updateContactUsData };
}

function handleInputErrors(address, phoneNumbers, emails) {
    if (!address || !phoneNumbers || !emails) {
        toast.error('Please fill atleast one field')
        return false
    }
    return true
}