import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verCursosAnalitics: builder.query({
      query: () => ({
        url: `ver-cursos-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    verUsuariosAnalitics: builder.query({
      query: () => ({
        url: `ver-usuarios-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    verPedidosAnalitics: builder.query({
      query: () => ({
        url: `ver-pedidos-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    
  }),
});

export const {useVerCursosAnaliticsQuery, useVerUsuariosAnaliticsQuery, useVerPedidosAnaliticsQuery} = analyticsApi;
