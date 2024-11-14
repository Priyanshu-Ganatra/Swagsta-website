import { useState } from "react";
import { toast } from "react-hot-toast";
import { addComment as addCommentApi } from "../src/apis/creativesApi";

export default function useAddComment() {
    const [isAdding, setisAdding] = useState(false);

    const addComment = async (formData, setComments) => {
        if (!formData.text) {
            return
        }

        let data
        setisAdding(true);
        try {
            data = await addCommentApi(formData);
            if (data.success) {
                setComments((prev) => [...prev, { text: formData.text, userId: { fullName: "You" } }]);
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
                setComments((prev) => prev.filter((comment) => comment.text !== formData.text))
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisAdding(false);
        }
    };

    return { isAdding, addComment };
}