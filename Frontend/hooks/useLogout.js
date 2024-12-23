import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { logout as logoutApi } from "../src/apis/authApi";
import { useDispatch } from 'react-redux';
import { setAuthUserAction } from "../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {
        setLoading(true)
        try {
            const data = await logoutApi()

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem('user')
            dispatch(setAuthUserAction({}))
            navigate('/')

            toast.success(data.message)
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout