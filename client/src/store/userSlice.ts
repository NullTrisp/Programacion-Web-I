import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

// Define a type for the slice state
interface UserState {
    value: string
}

// Define the initial state using that type
const initialState: UserState = {
    value: localStorage.getItem('username') || '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { add } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value

export default userSlice.reducer