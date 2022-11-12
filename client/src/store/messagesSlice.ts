import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessagesSlice extends Array<string> { };

const initialState: MessagesSlice = [];

export const messagesSlice = createSlice({
    name: 'sala',
    initialState,
    reducers: {
        pushMessage: (state, action: PayloadAction<string>) => {
            state.push(action.payload);
        }
    }
})

export const { pushMessage } = messagesSlice.actions

export default messagesSlice.reducer