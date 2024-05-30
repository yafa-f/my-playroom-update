import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {}
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {

        setCurrentUser: (state, action)=> {
            state.currentUser = action.payload
        },
    }
})
export const {setCurrentUser} = UserSlice.actions;


