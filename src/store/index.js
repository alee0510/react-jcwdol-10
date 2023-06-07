import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import usersReducer from "./slices/users"
import authReducer from "./slices/auth"

// @create store
const store = configureStore({
    reducer : {
        users : usersReducer,
        auth : authReducer
    },
})

// @export store
export default store