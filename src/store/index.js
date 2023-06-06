import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import usersReducer from "./slices/users"

// @create store
const store = configureStore({
    reducer : {
        users : usersReducer
    },
    enhancers : []
})

// @export store
export default store