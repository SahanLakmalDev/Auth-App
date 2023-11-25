import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = false;
            state.loading = false;
        },
        signInFail: (state, action) => {
            state.error = action.payload || null;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = false;
            state.loading = false;
        },
        updateUserFail: (state, action) => {
            state.error = action.payload || null;
            state.loading = false;   
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.error = false;
            state.loading = false;
        },
        deleteUserFail: (state, action) => {
            state.error = action.payload || null;
            state.loading = false;   
        },


    }

});
export const {signInStart , signInSuccess , signInFail, updateUserStart, updateUserSuccess, updateUserFail, deleteUserStart, deleteUserFail, deleteUserSuccess}  = userSlice.actions;
export default userSlice.reducer

