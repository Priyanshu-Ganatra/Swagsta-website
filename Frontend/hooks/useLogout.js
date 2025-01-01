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
        dispatch(setAuthUserAction({ loading: true, user: null }))

        try {
            const data = await logoutApi()

            if (data.error) {
                throw new Error(data.error)
            }

            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            dispatch(setAuthUserAction({ loading: false, user: null }))
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout