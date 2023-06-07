import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// @import schema validation
import { registerValidationSchema } from "./validation";

// @create async thunk
export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:2000/users" + `?username=${payload.username}&password=${payload.password}`)

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
            const response = await axios.get("http://localhost:2000/users" + `?token=${token}`)

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
            const response = await axios.get("http://localhost:2000/users" + `?username=${payload.username}&email=${payload.email}`)
            if (response.data?.length > 0) {
                return rejectWithValue({ message : "username or email already exist." })
            }

            // @save data to database
            const data = {
                uuid : "",
                username : payload.username,
                email : payload.email,
                password : payload.password,
                role : "user",
                status : "active",
                token : Math.random().toString(36).substring(7)
            }
            await axios.post("http://localhost:2000/users", data)

            // @save token to local storage
            localStorage.setItem("token", data.token)

            // @get data user
            const response2 = await axios.get("http://localhost:2000/users" + `?token=${data.token}`)

            return response2.data[0]
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

// @create slice
const authSlice = createSlice({
    name : "auth",
    initialState : {
        loading : false,
        id : null,
        username : null,
        password : null,
        email : null,
        role : null,
        token : null
    },
    reducers : {

    },
    extraReducers : {
        [login.pending] : (state, action) => {
            state.loading = true
        },
        [login.fulfilled] : (state, action) => {
            state.loading = false
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.password = action.payload?.password
            state.email = action.payload?.email
            state.role = action.payload?.role
            state.token = action.payload?.token            
        },
        [login.rejected] : (state, action) => {
            state.loading = false
        },
        [keepLogin.pending] : (state, action) => {
            state.loading = true
        },
        [keepLogin.fulfilled] : (state, action) => {
            state.loading = false
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.password = action.payload?.password
            state.email = action.payload?.email
            state.role = action.payload?.role
            state.token = action.payload?.token            
        },
        [keepLogin.rejected] : (state, action) => {
            state.loading = false
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
        }
    }
})

// export reducer
export default authSlice.reducer
