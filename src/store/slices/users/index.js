import { createSlice } from "@reduxjs/toolkit"
import { USERS } from "../../../pages/home/constants"

// users slice
const usersSlice = createSlice({
    name : "users",
    initialState : {
        data : USERS,
        filteredData : []
    },
    reducers : {
        deleteUser : (state, action) => {
            state.data = state.data.filter(user => user.id !== action.payload?.id)
        },
        addUser : (state, action) => {
            state.data = [...state.data, action.payload]
        },
        editUser : (state, action) => {
            state.data = state.data.map(user => {
                if (user?.id === action.payload?.id) {
                    return { ...user, ...action.payload }
                }

                return user
            })
        },
        searchUser : (state, action) => {
            state.filteredData = state.data.filter(user => {
                return user.name.toLowerCase().includes(action.payload?.toLowerCase())
            })
        },
        clearSearch : (state, action) => {
            state.filteredData = []
        },
        sorting : (state, action) => {
            state.filteredData = state.data.sort((a, b) => {
                if (a?.name < b?.name) {
                    return action.payload === "AZ" ? -1 : 1
                }

                if (a?.name > b?.name) {
                    return action.payload === "AZ" ? 1 : -1
                }

                return 0
            })
        }
    }
})

// export reducer
export default usersSlice.reducer

// export actions
export const { deleteUser, addUser, editUser, searchUser, clearSearch, sorting } = usersSlice.actions