import React, { FC, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { styles } from "../../styles/style";
import Loader from "../../components/Loader/Loader";

import { format } from "timeago.js";
import { useVerTodosUsuariosQuery } from "../../../redux/features/usuario/usuarioApi";

type Props = {
  isTeam: boolean;
};

const GerirTeam: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, error } = useVerTodosUsuariosQuery({});
  const [activo, setActivo] = useState(false);
  const [email, setEmail] =useState("");
  const [funcao, setFuncao] =useState("");
  const [open, setOpen] =useState(false);
  const [usuarioId, setUsuarioId] =useState("");

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },
    { field: "nome", headerName: "Nome", flex: 0.8 },
    { field: "email", headerName: "Email", flex: 0.6 },
    { field: "funcao", headerName: "Função", flex: 0.5 },
    { field: "cursos", headerName: "Cursos Comprados", flex: 0.5 },
    { field: "createdAt", headerName: "Data Registro", flex: 0.6 },

    {
      field: "",
      headerName: "Apagar",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button
            
            onClick={() => {
              setOpen(!open);
              setUsuarioId(params.row.id);
              }}
            >
              <AiOutlineDelete
                size={20}
                className="dark:text-white text-black"
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Mail",
      flex: 0.4,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail size={20} className="dark:text-white text-black" />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.usuarios.filter((item: any) => item.funcao === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          nome: item.nome,
          email: item.email,
          funcao: item.funcao,
          cursos: item.cursos.length,
          createdAt: item.createdAt,
        });
      });
  } else {
    data &&
      data.usuarios.forEach((item: any) => {
        rows.push({
          id: item._id,
          nome: item.nome,
          email: item.email,
          funcao: item.funcao,
          cursos: item.cursos.length,
          createdAt: item.createdAt,
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box mt="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[200px] dark:bg-[#57c7a3]  dark:border  dark:border-[#ffffff6c]`}
              onClick={() => setActivo(!activo)}
            >
              Adicionar Membro
            </div>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
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
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default GerirTeam;
