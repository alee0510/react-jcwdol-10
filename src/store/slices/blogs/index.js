import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getArticles } from "./slices"

const INITIAL_STATE = {
    articles : [],
    totalPage : 1,
    currentPage : 1,
    isLoading : false,
    // errorCode : null,
    // errorMessage : null,
}

const blogsSlice = createSlice({
    name : "blogs",
    initialState : INITIAL_STATE,
    extraReducers : {
        [getArticles.pending] : (state, action) => {
            state.isLoading = true
        },
        [getArticles.fulfilled] : (state, action) => {
            state.isLoading = false
            state.articles = action.payload?.result
            state.totalPage = action.payload?.page
            state.currentPage = action.payload?.blogPage
        },
        [getArticles.rejected] : (state, action) => {
            state.isLoading = false
            // state.errorCode = action.payload?.errorCode
            // state.errorMessage = action.payload?.errorMessage
            // @do error handle, console or show toast / alert message
        }
    }
})

export default blogsSlice.reducer