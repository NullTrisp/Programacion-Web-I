import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

// Define a type for the slice state
interface SalaState {
    name: string;
    id: string;
};

// Define the initial state using that type
const initialState: SalaState = {
    name: 'general',
    id: "",
}

export const salaSlice = createSlice({
    name: 'sala',
    initialState,
    reducers: {
        changeSala: (state, action: PayloadAction<SalaState>) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
        }
    }
})

export const { changeSala } = salaSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.sala.name

export default salaSlice.reducer