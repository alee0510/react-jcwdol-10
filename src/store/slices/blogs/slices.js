import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const URL = "https://minpro-blog.purwadhikabootcamp.com/api/blog?"

export const getArticles = createAsyncThunk(
    "blogs/getArticles",
    async (payload, { rejectWithValue }) => {
        try {
            // @generate parameter
            const { id_cat, page, sort } = payload
            const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`

            // @request to get articles
            const { data } = await Axios.get(URL + encodeURI(PARAMETER))
            
            // @return data
            return data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)