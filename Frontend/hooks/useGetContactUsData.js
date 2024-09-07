import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getData as getDataApi } from "../src/apis/contactUsApi";

export default function useGetContactUsData() {
    const [isFetchingContactUsData, setisFetchingData] = useState(false)

    const getContactUsData = async () => {
        setisFetchingData(true)
        try {
            const data = await getDataApi()
            return data
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setisFetchingData(false)
        }
    }

    return { isFetchingContactUsData, getContactUsData }
}