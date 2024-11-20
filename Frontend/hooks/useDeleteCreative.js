import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteCreative as deleteCreativeApi } from "../src/apis/creativesApi";

export default function useDeleteCreative() {
    const [isDeletingCreative, setIsDeletingCreative] = useState(false)

    const deleteCreative = async (id) => {
        setIsDeletingCreative(true)
        try {
            return await deleteCreativeApi(id)
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsDeletingCreative(false)
        }
    }

    return { isDeletingCreative, deleteCreative }
}