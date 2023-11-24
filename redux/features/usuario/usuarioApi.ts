import { apiSlice } from "../api/apiSlice";


export const usuarioApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        actualizarAvatar: builder.mutation({
            query: (avatar) => ({
                url:"actualizar-photo-usuario",
                method:"PUT",
                body:{avatar},
                credentials: "include" as const,
            })
        }),
         editarPerfil: builder.mutation({
            query: ({nome}) => ({
                url:"actualizar-usuario-info",
                method:"PUT",
                body:{
                    nome,
                   
                },
                credentials: "include" as const,
            })
        }),
        actualizarPalavraPasse: builder.mutation({
            query: ({antigaPalavraPasse, novaPalavraPasse}) => ({
                url:"actualizar-palavra-passe-usuario",
                method:"PUT",
                body:{
                    antigaPalavraPasse, 
                    novaPalavraPasse,
                   
                },
                credentials: "include" as const,
            })
        }),
        verTodosUsuarios: builder.query({
            query: () => ({
                url:"ver-todos-usuarios",
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
});


export const {useActualizarAvatarMutation, useEditarPerfilMutation, useActualizarPalavraPasseMutation, useVerTodosUsuariosQuery } = usuarioApi;