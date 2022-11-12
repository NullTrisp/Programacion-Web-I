import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface SalaState {
    name: string;
    id: string;
};

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

export default salaSlice.reducer