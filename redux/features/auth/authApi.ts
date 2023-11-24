import { apiSlice } from "../api/apiSlice";
import { registroUsuario, usuarioLogado, usuarioLogout } from "./authSlice";

type registroResposta = {
  message: string;
  activacaoToken: string;
};

type registroDados = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints
    registar: builder.mutation<registroResposta, registroDados>({
      query: (data) => ({
        url: "registar",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const resultado = await queryFulfilled;
          dispatch(
            registroUsuario({
              token: resultado.data.activacaoToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activacao: builder.mutation({
      query: ({ activacao_token, activacao_codigo }) => ({
        url: "activar-usuario",
        method: "POST",
        body: {
          activacao_token,
          activacao_codigo,
        },
      }),
    }),

    login: builder.mutation({
      query: ({ email, palavraPasse }) => ({
        url: "login-usuario",
        method: "POST",
        body: {
          email,
          palavraPasse,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const resultado = await queryFulfilled;
          dispatch(
            usuarioLogado({
              accessToken: resultado.data.activacaoToken,
              usuario: resultado.data.usuario,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ email, nome, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          nome,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const resultado = await queryFulfilled;
          dispatch(
            usuarioLogado({
              accessToken: resultado.data.activacaoToken,
              usuario: resultado.data.usuario,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logOut: builder.query({
      query: () => ({
        url: "logout-usuario",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(usuarioLogout());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegistarMutation,
  useActivacaoMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
} = authApi;
