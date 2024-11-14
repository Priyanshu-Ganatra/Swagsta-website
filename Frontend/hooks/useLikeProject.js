import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { likeProject as likeProjectApi } from "../src/apis/projectsApi";

export default function useLikeProject() {
    const [isLiking, setIsLiking] = useState(false)

    const likeProject = async (formData) => {
        setIsLiking(true)
        try {
            const data = await likeProjectApi(formData)
            return data
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsLiking(false)
        }
    }

    return { isLiking, likeProject }
}