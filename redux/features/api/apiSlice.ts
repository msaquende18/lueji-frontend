import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { usuarioLogado } from '../auth/authSlice';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
           query: (data) => (  {
               url:"refresh",
               method:"GET",
               credentials: "include" as const,
           }),

        }),
       carregarUsuario: builder.query({
           query: (data) => ( {
               url:"me",
               method:"GET",
               credentials: "include" as const,
           }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const resultado = await queryFulfilled;
                    dispatch(
                        usuarioLogado ({
                            accessToken: resultado.data.activacaoToken,
                            usuario: resultado.data.usuario,
                        })
                    );
                } catch (error:any) {
                    console.log(error)
                }
            }

        }),
    }),
});


export const {useRefreshTokenQuery, useCarregarUsuarioQuery} = apiSlice;