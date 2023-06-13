import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getArticles = createAsyncThunk(
    "blogs/getArticles",
    async (payload, { rejectWithValue }) => {
        try {
            // @generate parameter
            const { id_cat, page, sort } = payload
            const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`

            // @request to get articles
            const { data } = await api.get("/blog?" + encodeURI(PARAMETER))
            
            // @return data
            return data
        } catch (error) {
            console.error(error)
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)