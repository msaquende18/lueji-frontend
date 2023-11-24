import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verDadosLayout: builder.query({
      query: (tipo) => ({
        url: `ver-layout/${tipo}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    editarLayout: builder.mutation({
      query: ({ tipo, imagem, titulo, subtitulo, faq, categorias }) => ({
        url: `editar-layout`,
        body: {
          tipo,
          imagem,
          titulo,
          subtitulo,
          faq,
          categorias,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {useVerDadosLayoutQuery, useEditarLayoutMutation} = layoutApi;
