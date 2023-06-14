import { createAsyncThunk } from "@reduxjs/toolkit"
import { registerValidationSchema } from "./validation"
import Toast from "react-hot-toast"
import api from "../../utils/api.instance"

// @create async thunk
export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            // @do authentication with payload : { username, password }
            const { data } = await api.post("/auth/login", payload)

            // @save token to local storage
            localStorage.setItem("token", data?.token)

            // @show toast success
            Toast.success("Login success.")

            return data?.isAccountExist
        } catch (error) {
            // console.error(error.response ? error.response.data : error)
            // Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            // @get user data with token
            const { data } = await api.get("/auth")

            return data
        } catch (error) {
            // console.error(error.response ? error.response.data : error)
            // Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth", payload)

            // save token
            localStorage.setItem("token", data?.token)

            // show toast success
            Toast.success("Register success. Please check your email to verify your account.")

            return data?.data
        } catch (error) {
            // console.error(error.response ? error.response.data : error)
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (payload, { rejectWithValue }) => {
        try {
            // @delete token from local storage
            localStorage.removeItem("token")

            return {}
        } catch (error) {
            // console.error(error.response ? error.response.data : error)
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const verifyAccount = createAsyncThunk(
    "auth/verifyAccount",
    async (payload, { rejectWithValue }) => {
        try {
            await api.patch("/auth/verify")

            Toast.success("Verify account success.")
            return
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const updateImageProfile = createAsyncThunk(
    "auth/updateProfile",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/profile/single-uploaded", payload)

            Toast.success("Update image profile success.")
            return data?.imgProfile
        } catch (error) {
            // console.error(error)
            // Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)