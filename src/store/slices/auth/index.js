import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { login, keepLogin, register, logout } from "./slices";

// @initial state
const INITIAL_STATE = {
    isLoginLoading : false,
    isKeepLoginLoading : false, 
    isLogoutLoading : false,
    id : null,
    username: "",
    email: "",
    phone : "",
    imgProfile : null,
    isVerified : true,
    role : true,
}

// @create slice
const authSlice = createSlice({
    name : "auth",
    initialState : INITIAL_STATE,
    extraReducers : {
        [login.pending] : (state, action) => {
            state.isLoginLoading = true
        },
        [login.fulfilled] : (state, action) => {
            // state.isLoginLoading = false
            // state.id = action.payload?.id
            // state.username = action.payload?.username
            // state.email = action.payload?.email
            // state.role = action.payload?.role
            // state.isVerified = action.payload?.isVerified 
            
            state = Object.assign(state, {
                isLoginLoading : false,
                id : action.payload?.id,
                username : action.payload?.username,
                phone : action.payload?.phone,
                imageProfile : action.payload?.imageProfile,
                email : action.payload?.email,
                role : action.payload?.role,
                isVerified : action.payload?.isVerified,
            })
        },
        [login.rejected] : (state, action) => {
            state.isLoginLoading = false
        },
        [keepLogin.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [keepLogin.fulfilled] : (state, action) => {
            // state.isKeepLoginLoading = false
            // state.id = action.payload?.id
            // state.username = action.payload?.username
            // state.password = action.payload?.password
            // state.email = action.payload?.email
            // state.role = action.payload?.role
            // state.token = action.payload?.token          
            
            state = Object.assign(state, {
                isKeepLoginLoading : false,
                id : action.payload?.id,
                username : action.payload?.username,
                phone : action.payload?.phone,
                imageProfile : action.payload?.imageProfile,
                email : action.payload?.email,
                role : action.payload?.role,
                isVerified : action.payload?.isVerified,
            })
        },
        [keepLogin.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        },
        [register.pending] : (state, action) => {
            state.loading = true
        },
        [register.fulfilled] : (state, action) => {
            state.loading = false
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.password = action.payload?.password
            state.email = action.payload?.email
            state.role = action.payload?.role
            state.token = action.payload?.token            
        },
        [register.rejected] : (state, action) => {
            state.loading = false
        },
        [logout.pending] : (state, action) => {
            state.isLogoutLoading = true
        },
        [logout.fulfilled] : (state, action) => {
            state = INITIAL_STATE         
        },
        [logout.rejected] : (state, action) => {
            state.isLogoutLoading = false
        }
    }
})

// export reducer
export default authSlice.reducer
