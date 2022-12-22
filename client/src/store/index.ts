import { configureStore } from '@reduxjs/toolkit'
import statusSlice from './appStatus'
import messagesSlice from './messagesSlice'
import salaSlice from './salaSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        sala: salaSlice,
        messages: messagesSlice,
        status: statusSlice,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch