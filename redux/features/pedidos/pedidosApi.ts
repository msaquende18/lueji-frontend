import { apiSlice } from "../api/apiSlice";

export const pedidosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verTransacoes: builder.query({
      query: () => ({
        url: `ver-todos-pedidos`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getStripePublishablekey: builder.query({
      query: () => ({
        url: `payment/stripepublishablekey`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: `payment`,
        method: "POST",
        body:{
          amount
        },
        credentials: "include" as const,
      }),
    }),

    criarPedido: builder.mutation({
      query: ({cursoId, pagamento_info}) => ({
        url: `criar-pedido`,
        method: "POST",
        body:{
          cursoId,
          pagamento_info
        },
        credentials: "include" as const,
      }),
    }),


    
  }),
});

export const {useVerTransacoesQuery, useGetStripePublishablekeyQuery, useCreatePaymentIntentMutation, useCriarPedidoMutation} = pedidosApi;
