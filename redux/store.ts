'use client'
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './features/api/apiSlice';
import authSlice from "./features/auth/authSlice";


export const store = configureStore({
    reducer: {
       [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) 
});

//Aqui é chamado a função refresh token toda vez que página carrega


const iniatializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.carregarUsuario.initiate({}, {forceRefetch: true}));
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true})); 
    
    
};

iniatializeApp();