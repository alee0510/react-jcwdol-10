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
            console.error(error)
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error?.response?.data)
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
            console.error(error)
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            // @do validation
            await registerValidationSchema.validate(payload)

            // @do validation in remote -> check if username or email already exist
            const response = await api.get("/users" + `?username=${payload.username}&email=${payload.email}`)
            if (response.data?.length > 0) {
                return rejectWithValue({ message : "username or email already exist." })
            }

            // @save data to database
            const data = {
                username : payload.username,
                email : payload.email,
                password :"",
                role : "user",
                status : "active",
                token : ""
            }
            await api.post("/users", data)

            // @save token to local storage
            localStorage.setItem("token", data.token)

            // @get data user
            const response2 = await api.get("/users" + `?token=${data.token}`)

            return response2.data[0]
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
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
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)