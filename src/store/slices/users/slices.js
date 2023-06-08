import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";

// @create async thunk
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.get("/data");

            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
)