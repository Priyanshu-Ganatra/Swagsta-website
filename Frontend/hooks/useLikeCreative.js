import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { likeCreative as likeCreativeApi } from "../src/utils/creativesApi";

export default function useLikeCreative() {
    const [isLiking, setIsLiking] = useState(false)

    const likeCreative = async (id, username) => {
        setIsLiking(true)
        try {
            const data = await likeCreativeApi(id, username)
            return data
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsLiking(false)
        }
    }

    return { isLiking, likeCreative }
}