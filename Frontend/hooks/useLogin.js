import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { login as loginApi } from "../src/apis/authApi";
import { useNavigate } from 'react-router-dom';
import { setAuthUserAction } from "../features/auth/authSlice";
import { useDispatch } from 'react-redux';

export default function useLogin() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async ({ email, password }) => {
        const success = handleInputErrors({ email, password })
        if (!success) return

        setLoading(true)
        dispatch(setAuthUserAction({ loading: true, user: null }))

        try {
            const data = await loginApi({ email, password })

            if (data.user === undefined) {
                throw new Error(data.message)
            }

            dispatch(setAuthUserAction({ loading: false, user: data.user }))

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

function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill in all fields")
        return false
    }

    return true
}
