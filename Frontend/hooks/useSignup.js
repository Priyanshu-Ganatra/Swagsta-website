import { useState } from "react";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../src/apis/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUserAction } from "../features/auth/authSlice";

export default function useSignup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signup = async ({ fullName, email, password, confirmPassword, otp }) => {
        const success = handleInputErrors({ fullName, email, password, confirmPassword, otp })
        if (!success) return
        
        setLoading(true);
        try {
            console.log('Before send ing req: ', { fullName, email, password, otp });
            
            const data = await signupApi({ fullName, email, password, otp });
            
            if (data.savedUser === undefined) {
                throw new Error(data.message)
            }

            localStorage.setItem('user', JSON.stringify(data.savedUser))
            dispatch(setAuthUserAction(data.savedUser))
            
            toast.success(data.message)
            navigate('/portfolio')
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
}

function handleInputErrors({ fullName, email, password, confirmPassword, otp }) {
    if (!fullName || !email || !password || !confirmPassword) {
        toast.error('Please fill every field')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }

    if (!otp) {
        toast.error('OTP missing')
        return false
    }

    return true
}