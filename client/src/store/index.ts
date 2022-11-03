import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import salaSlice from './salaSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        user: userSlice,
        sala: salaSlice,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch