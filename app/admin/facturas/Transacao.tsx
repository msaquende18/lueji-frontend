import React, { useState, useEffect } from "react";
import { useVerTransacoesQuery } from "../../../redux/features/pedidos/pedidosApi";
import { useVerTodosUsuariosQuery } from "../../../redux/features/usuario/usuarioApi";
import { useVerTodosCursosQuery } from "../../../redux/features/cursos/cursosApi";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { styles } from "../../styles/style";
import Loader from "../../components/Loader/Loader";

import { format } from "timeago.js";

type Props = {
  isDashboard?: boolean;
};

const Transacao = ({ isDashboard }: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data } = useVerTransacoesQuery({});
  const { data: dadosDoUsuario } = useVerTodosUsuariosQuery({});
  const { data: dadosDoCurso } = useVerTodosCursosQuery({});

  const [dadosDosPedidos, setDadosDosPedidos] = useState<any>([]);

 useEffect(() => {
   if (data && data.pedidos && data.pedidos.length > 0) {
     const temp = data.pedidos.map((item: any) => {
       const usuario = dadosDoUsuario?.usuarios.find(
         (usuario: any) => usuario._id === item.usuarioId
       );
       const curso = dadosDoCurso?.cursos.find(
         (curso: any) => curso._id === item.cursoId
       );
       return {
         ...item,
         nome: usuario?.nome,
         email: usuario?.email,
         titulo: curso?.nome,
         preco: "$" + curso?.preco,
       };
     });
     setDadosDosPedidos(temp);
   }
 }, [data, dadosDoUsuario, dadosDoCurso]);


  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "nome", headerName: "Nome", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "email", headerName: "Email", flex: 1 },
          { field: "titulo", headerName: "Curso", flex: 1 },
        ]),
    { field: "preco", headerName: "Preço", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "createdAt", headerName: "Data", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <>
                  <a href={`mailto:${params.row.email}`}>
                    <AiOutlineMail
                      size={20}
                      className="dark:text-white text-black"
                    />
                  </a>
                </>
              );
            },
          },
        ]),
  ];

 // const rows: any = [];

 const rows: any = [];

 dadosDosPedidos &&
   dadosDosPedidos.forEach((item: any) => {
     rows.push({
       id: item._id,
       nome: item.nome,
       email: item.email,
       titulo: item.titulo,
       preco: item.preco,
       createdAt: item.createdAt,
     });
   });
  
  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box mt={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar}}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Transacao;
