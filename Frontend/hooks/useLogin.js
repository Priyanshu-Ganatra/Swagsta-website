import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { login as loginApi } from "../src/utils/authApi";
import { useNavigate } from 'react-router-dom';
import { setAuthUserAction } from "../features/auth/authSlice";
import { useDispatch } from 'react-redux';

export default function useLogin() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password })
        if (!success) return

        setLoading(true)
        try {
            const data = await loginApi({ username, password })

            if (data.user === undefined) {
                throw new Error(data.message)
            }

            localStorage.setItem('user', JSON.stringify(data.user))
            dispatch(setAuthUserAction(data.user))

            toast.success(data.message)
            navigate('/portfolio')
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all fields")
        return false
    }

    return true
}
