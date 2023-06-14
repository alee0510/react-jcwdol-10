import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-hot-toast"

// @import async thunk
import { getArticles, likeArticle } from "./slices"
import { isErrorOccured } from "../auth";

const INITIAL_STATE = {
    articles : [],
    totalPage : 1,
    currentPage : 1,
    isLoading : false,
}

const blogsSlice = createSlice({
    name : "blogs",
    initialState : INITIAL_STATE,
    extraReducers : builder => {
        builder.addCase(getArticles.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getArticles.fulfilled, (state, action) => {
            state.isLoading = false
            state.articles = action.payload?.result
            state.totalPage = action.payload?.page
            state.currentPage = action.payload?.blogPage
        })
        builder.addMatcher(isErrorOccured, (state, action) => {
            state.isLoading = false
            
            // @console error
            console.error(action.payload)
            Toast.error(action.payload?.message || "Error : something went wrong.")
        })
    }
})



// {
//     [getArticles.pending] : (state, action) => {
//         state.isLoading = true
//     },
//     [getArticles.fulfilled] : (state, action) => {
//         // state.isLoading = false
//         // state.articles = action.payload?.result
//         // state.totalPage = action.payload?.page
//         // state.currentPage = action.payload?.blogPage

//         state = Object.assign(state, {
//             isLoading : false,
//             articles : action.payload?.result,
//             totalPage : action.payload?.page,
//             currentPage : action.payload?.blogPage,
//         })
//     },
//     [getArticles.rejected] : (state, action) => {
//         state.isLoading = false
//     }
// }
export default blogsSlice.reducer