import { createAsyncThunk } from "@reduxjs/toolkit"
import { registerValidationSchema } from "./validation"
import { encrypt } from "./encryption"
import api from "../../utils/api.instance"

// @create async thunk
export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const encryptedPassword = encrypt(payload.password)
            const response = await api.get("/users" + `?username=${payload.username}&password=${encryptedPassword}`)

            // @if data empty
            if (response.data?.length === 0) {
                return rejectWithValue({ message : "username or password does't exist." })
            }

            // @save token to local storage
            localStorage.setItem("token", response?.data[0]?.token)

            return response.data[0]
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            // get token from local storage
            const token = localStorage.getItem("token")

            // @if token empty
            if (!token) {
                return rejectWithValue({ message : "token not found." })
            }

            // @get data user
            const response = await api.get("/users" + `?token=${token}`)

            return response.data[0]
        } catch (error) {
            console.error(error)
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
                password : encrypt(payload.password),
                role : "user",
                status : "active",
                token : encrypt(payload.username + payload.email)
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