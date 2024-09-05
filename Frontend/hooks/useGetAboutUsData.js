import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getData as getDataApi } from "../src/apis/aboutUsApi";

export default function useGetAboutUsData() {
    const [isFetchingAboutUsData, setisFetchingData] = useState(false)

    const getAboutUsData = async () => {
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

    return { isFetchingAboutUsData, getAboutUsData }
}