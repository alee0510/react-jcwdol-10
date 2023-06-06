import { createSlice } from "@reduxjs/toolkit"
import { USERS } from "../../../pages/home/constants"

// users slice
const usersSlice = createSlice({
    name : "users",
    initialState : {
        data : USERS
    },
    reducers : {
        deleteUser : (state, action) => {
            state.data = state.data.filter(user => user.id !== action.payload?.id)
        },
        addUser : (state, action) => {
            
        }
    }
})

// export reducer
export default usersSlice.reducer

// export actions
export const { deleteUser } = usersSlice.actions