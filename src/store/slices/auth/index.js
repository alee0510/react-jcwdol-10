import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-hot-toast";

// @import async thunk
import { 
    login, 
    keepLogin, 
    register, 
    logout,
    verifyAccount, 
    updateImageProfile 
} from "./slices";

// @initial state
const INITIAL_STATE = {
    isLoginLoading : false,
    isKeepLoginLoading : false, 
    isRegisterLoading : false,
    isLogoutLoading : false,
    isUploadImageLoading : false,
    id : null,
    username: "",
    email: "",
    phone : "",
    imgProfile : null,
    isVerified : false,
    role : "",
}

//@global error hanlder
export const isErrorOccured = (action) => {
    return action.type.endsWith("rejected")
}

// @auth success
const isAuthSuccess = (action) => {
    // return action.type === login.fulfilled.type || action.type === keepLogin.fulfilled.type || action.type === register.fulfilled.type
    return [
        login.fulfilled.type, 
        keepLogin.fulfilled.type, 
        register.fulfilled.type
    ].includes(action.type)
}

// @create slice
const authSlice = createSlice({
    name : "auth",
    initialState : INITIAL_STATE,
    extraReducers : builder => {
        builder.addCase(register.pending, (state, action) => {
            state.isRegisterLoading = true
        })
        builder.addCase(login.pending, (state, action) => {
            state.isLoginLoading = true
        })
        builder.addCase(verifyAccount.pending, (state, action) => {
            state.isRegisterLoading = true
        })
        builder.addCase(verifyAccount.fulfilled, (state, action) => {
            state.isRegisterLoading = false
            state.isVerified = true
        })
        // builder.addCase(login.fulfilled, (state, action) => {
        //     state = Object.assign(state, {
        //         isLoginLoading : false,
        //         id : action.payload?.id,
        //         username : action.payload?.username,
        //         phone : action.payload?.phone,
        //         imgProfile : action.payload?.imageProfile,
        //         email : action.payload?.email,
        //         role : action.payload?.role,
        //         isVerified : action.payload?.isVerified,
        //     })
        // })
        // builder.addCase(login.rejected, (state, action) => {
        //     state.isLoginLoading = false
        // })
        builder.addCase(keepLogin.pending, (state, action) => {
            state.isKeepLoginLoading = true
        })
        // builder.addCase(keepLogin.fulfilled, (state, action) => {
        //     state = Object.assign(state, {
        //         isKeepLoginLoading : false,
        //         id : action.payload?.id,
        //         username : action.payload?.username,
        //         phone : action.payload?.phone,
        //         imgProfile : action.payload?.imageProfile,
        //         email : action.payload?.email,
        //         role : action.payload?.role,
        //         isVerified : action.payload?.isVerified,
        //     })
        // })
        // builder.addCase(keepLogin.rejected, (state, action) => {
        //     state.isKeepLoginLoading = false
        // })
        builder.addCase(logout.pending, (state, action) => {
            state.isLogoutLoading = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state = Object.assign(state, INITIAL_STATE)         
        })
        // builder.addCase(logout.rejected, (state, action) => {
        //     state.isLogoutLoading = false
        // })
        builder.addCase(updateImageProfile.pending, (state, action) => {
            state.isUploadImageLoading = true
        })
        builder.addCase(updateImageProfile.fulfilled, (state, action) => {
            state.isUploadImageLoading = false
            state.imgProfile = action.payload
        })
        // builder.addCase(updateImageProfile.rejected, (state, action) => {
        //     state.isUploadImageLoading = false
        // })

        // @auth success handler
        builder.addMatcher(isAuthSuccess, (state, action) => {
            state = Object.assign(state, {
                isLoginLoading : false,
                isKeepLoginLoading : false,
                isRegisterLoading : false,
                id : action.payload?.id,
                username : action.payload?.username,
                phone : action.payload?.phone,
                imgProfile : action.payload?.imageProfile,
                email : action.payload?.email,
                role : action.payload?.role,
                isVerified : action.payload?.isVerified,
            })
        })

        // @error hanlder
        builder.addMatcher(isErrorOccured, (state, action) => {
            state.isLoginLoading = false
            state.isKeepLoginLoading = false
            state.isRegisterLoading = false
            state.isLogoutLoading = false
            state.isUploadImageLoading = false

            // @console error
            console.error(action.payload)
            Toast.error(action.payload?.message || "Error : something went wrong.")
        })
    }
})

// export reducer
export default authSlice.reducer


// {
//     [login.pending] : (state, action) => {
//         state.isLoginLoading = true
//     },
//     [login.fulfilled] : (state, action) => {
//         // state.isLoginLoading = false
//         // state.id = action.payload?.id
//         // state.username = action.payload?.username
//         // state.email = action.payload?.email
//         // state.role = action.payload?.role
//         // state.isVerified = action.payload?.isVerified 
        
//         state = Object.assign(state, {
//             isLoginLoading : false,
//             id : action.payload?.id,
//             username : action.payload?.username,
//             phone : action.payload?.phone,
//             imageProfile : action.payload?.imageProfile,
//             email : action.payload?.email,
//             role : action.payload?.role,
//             isVerified : action.payload?.isVerified,
//         })
//     },
//     [login.rejected] : (state, action) => {
//         state.isLoginLoading = false
//     },
//     [keepLogin.pending] : (state, action) => {
//         state.isKeepLoginLoading = true
//     },
//     [keepLogin.fulfilled] : (state, action) => {
//         // state.isKeepLoginLoading = false
//         // state.id = action.payload?.id
//         // state.username = action.payload?.username
//         // state.password = action.payload?.password
//         // state.email = action.payload?.email
//         // state.role = action.payload?.role
//         // state.token = action.payload?.token          
        
//         state = Object.assign(state, {
//             isKeepLoginLoading : false,
//             id : action.payload?.id,
//             username : action.payload?.username,
//             phone : action.payload?.phone,
//             imageProfile : action.payload?.imageProfile,
//             email : action.payload?.email,
//             role : action.payload?.role,
//             isVerified : action.payload?.isVerified,
//         })
//     },
//     [keepLogin.rejected] : (state, action) => {
//         state.isKeepLoginLoading = false
//     },
//     [register.pending] : (state, action) => {
//         state.loading = true
//     },
//     [register.fulfilled] : (state, action) => {
//         state.loading = false
//         state.id = action.payload?.id
//         state.username = action.payload?.username
//         state.password = action.payload?.password
//         state.email = action.payload?.email
//         state.role = action.payload?.role
//         state.token = action.payload?.token            
//     },
//     [register.rejected] : (state, action) => {
//         state.loading = false
//     },
//     [logout.pending] : (state, action) => {
//         state.isLogoutLoading = true
//     },
//     [logout.fulfilled] : (state, action) => {
//         state = Object.assign(state, INITIAL_STATE)         
//     },
//     [logout.rejected] : (state, action) => {
//         state.isLogoutLoading = false
//     },
//     [updateImageProfile.pending] : (state, action) => {
//         state.isUploadImageLoading = true
//     },
//     [updateImageProfile.fulfilled] : (state, action) => {
//         state.isUploadImageLoading = false
//         state.imgProfile = action.payload
//     },
//     [updateImageProfile.rejected] : (state, action) => {
//         state.isUploadImageLoading = false
//     }
// }
