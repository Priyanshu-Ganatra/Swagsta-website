import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { sendEmailOtp as sendEmailOtpApi } from "../src/apis/authApi";

const useSendEmailOtp = () => {
    const [loading, setLoading] = useState(false)

    const sendEmailOtp = async (email, navigate, dispatch, setOtp) => {
        setLoading(true)
        try {
            const data = await sendEmailOtpApi(email)

            if (data.error) {
                console.log(data.error);
                throw new Error(data.error)
            }

            toast.success(data.message)
            dispatch(setOtp(data.otp))
            navigate('/verify-email')
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, sendEmailOtp }
}

export default useSendEmailOtp