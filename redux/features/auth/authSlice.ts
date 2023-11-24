import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    usuario: "",
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        registroUsuario: (state,action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token;
        },
        usuarioLogado: (state,action: PayloadAction<{accessToken: string, usuario: string}>) => {
            state.token = action.payload.accessToken;
            state.usuario = action.payload.usuario;
        },
        usuarioLogout: (state) => {
            state.token = "";
            state.usuario = "";
        }
    }
})

export const {registroUsuario, usuarioLogado, usuarioLogout} = authSlice.actions;


export default authSlice.reducer;