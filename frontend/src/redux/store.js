import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from './features/blogs/blogsapi.js'
import authApi from './features/auth/authApi.js'
import authReducer from './features/auth/authSlice.js'
import commentApi from './features/comment/commentApi.js'

export const store= configureStore({
    reducer:{
        [blogApi.reducerPath] : blogApi.reducer,
        [authApi.reducerPath] :authApi.reducer,
        [commentApi.reducerPath] :commentApi.reducer,
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(blogApi.middleware ,authApi.middleware , commentApi.middleware ),
})


