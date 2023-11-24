import { apiSlice } from "../api/apiSlice";


export const cursoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        criarCurso: builder.mutation({
            query: ( data ) => ({
                url: "criar-curso",
                method: "POST",
                body: data ,
                credentials: "include" as const,
            }),
        }),
        verTodosCursos: builder.query({
            query: ( ) => ({
                url: "ver-todos-cursos",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        eliminarCurso: builder.mutation({
            query: (id) => ({
                url: `eliminar-curso/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
         editarCurso: builder.mutation({
            query: ({id,data}) => ({
                url: `editar-curso/${id}`,
                method: "PUT",
                body:data,
                credentials: "include" as const,
            }),
        }),
        verCursos: builder.query({
            query: () => ({
                url: "ver-cursos",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        verDetalhesDoCurso: builder.query({
            query: (id) => ({
                url: `ver-curso/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),

        verConteudoDoCurso: builder.query({
            query: (id) => ({
                url: `ver-conteudo-curso/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),

        
    }),
});

export const {useCriarCursoMutation, useVerTodosCursosQuery, useEliminarCursoMutation, useEditarCursoMutation, useVerCursosQuery, useVerDetalhesDoCursoQuery, useVerConteudoDoCursoQuery} = cursoApi;