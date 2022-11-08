import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { User } from "../components/Chat"

// Define a type for the slice state
interface UserState extends User { };

// Define the initial state using that type
const initialState: UserState = {
    username: localStorage.getItem('username') || '',
    id: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username;
            state.id = action.payload.id;
        }
    }
})

export const { add } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.id

export default userSlice.reducer