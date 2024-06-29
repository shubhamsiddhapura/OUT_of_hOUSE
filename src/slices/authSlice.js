import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') || null,
    signupData:null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData(state,value) {
            state.signupData = value.payload;
        },
        setLoading(state,value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, clearToken,setLoading,setSignupData } = authSlice.actions;
export default authSlice.reducer;



