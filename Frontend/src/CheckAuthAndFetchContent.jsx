import useGetProjects from "../hooks/useGetProjects";
import useGetCreatives from "../hooks/useGetCreatives";
import useGetCaseStudyProjects from "../hooks/useGetCaseStudyProjects";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { checkAuth } from "@/apis/authApi";
import { setAuthUserAction } from "../features/auth/authSlice";
import LoadingOverlay from "@/pages/ProfilePage/LoadingOverlay";
import useGetCollections from "../hooks/useGetCollections";

const CheckAuthAndFetchContent = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const { getCollections } = useGetCollections();
    const { getProjects } = useGetProjects();
    const { getCreatives } = useGetCreatives();
    const { getCaseStudyProjects } = useGetCaseStudyProjects();

    useEffect(() => {
        // Initial data loading
        const loadData = async () => {
            await getProjects();
            await getCreatives();
            await getCaseStudyProjects();
            await getCollections();
        };
        loadData();
    }, []);

    useEffect(() => {
        // Check authentication status
        const fetchUser = async () => {
            dispatch(setAuthUserAction({ loading: true, user: null }));
            const res = await checkAuth();
            if (res.user) {
                dispatch(setAuthUserAction({ loading: false, user: res.user }));
            } else {
                dispatch(setAuthUserAction({ loading: false, user: null }));
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <></>
    )
}

export default CheckAuthAndFetchContent