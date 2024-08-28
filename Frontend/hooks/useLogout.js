import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { logout as logoutApi } from "../src/utils/authApi";
import { useDispatch } from 'react-redux';
import { setAuthUserAction } from "../features/auth/authSlice";

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    const logout = async () => {
        setLoading(true)
        try {
            const data = await logoutApi()

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem('user')
            dispatch(setAuthUserAction({}))

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