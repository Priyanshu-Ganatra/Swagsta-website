import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { likeCreative as likeCreativeApi } from "../src/apis/creativesApi";

export default function useLikeCreative() {
    const [isLiking, setIsLiking] = useState(false)

    const likeCreative = async (id) => {
        setIsLiking(true)
        try {
            const res = await likeCreativeApi(id)
            return res
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsLiking(false)
        }
    }

    return { isLiking, likeCreative }
}