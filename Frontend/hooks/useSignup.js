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

    const signup = async ({ fullName, username, password, confirmPassword }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword })
        if (!success) return
        
        setLoading(true);
        try {
            const data = await signupApi({ fullName, username, password });
            
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

function handleInputErrors({ fullName, username, password, confirmPassword }) {
    if (!fullName || !username || !password || !confirmPassword) {
        toast.error('Please fill every field')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }

    return true
}