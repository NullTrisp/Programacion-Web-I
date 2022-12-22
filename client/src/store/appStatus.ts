import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface AppStatusState {
    installed: boolean;
    update: boolean;
};

const initialState: AppStatusState = {
    installed: localStorage.getItem("appInstalled") ? Boolean(localStorage.getItem("appInstalled")) : false,
    update: false,
}

export const installedSlice = createSlice({
    name: 'appstatus',
    initialState,
    reducers: {
        changeInstalled: (state, action: PayloadAction<boolean>) => {
            state.installed = action.payload;
            localStorage.setItem("appInstalled", String(action.payload));
        },
        changeUpdate: (state, action: PayloadAction<boolean>) => {
            state.update = action.payload;
        },
    }
})

export const { changeInstalled, changeUpdate } = installedSlice.actions

export default installedSlice.reducer