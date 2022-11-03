import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

// Define a type for the slice state
interface UserState {
    value: string
}

// Define the initial state using that type
const initialState: UserState = {
    value: 'general',
}

export const salaSlice = createSlice({
    name: 'sala',
    initialState,
    reducers: {
        changeSala: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { changeSala } = salaSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.sala.value

export default salaSlice.reducer