import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/User';

interface UserState extends User { };

const initialState: UserState = {
    username: sessionStorage.getItem('username') || '',
    id: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username;
            state.id = action.payload.id;
        },
        removeUser: (state) => {
            state.username = "";
            state.id = "";
            sessionStorage.removeItem('username');
        }
    }
})

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer