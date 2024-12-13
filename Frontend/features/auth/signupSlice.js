import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    otp: null
};

const signupSlice = createSlice({
    name: "signupData",
    initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setOtp(state, value) {
            state.otp = value.payload;
        },
    },
});

export const { setSignupData, setLoading, setOtp } = signupSlice.actions;

export default signupSlice.reducer;
