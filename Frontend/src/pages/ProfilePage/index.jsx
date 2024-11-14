import useLogout from "../../../hooks/useLogout"
import { FiLogOut } from "react-icons/fi";

const ProfilePage = () => {
    const { loading, logout } = useLogout()

    return (
        <div>
            <p className='route flex items-center gap-2' onClick={logout}>
                {loading ?
                    <>
                        Logging out...
                        <span className="loading loading-spinner loading-xs"></span>
                    </> :
                    <>
                        Log out
                        <FiLogOut />
                    </>}
            </p>

        </div>
    )
}

export default ProfilePage