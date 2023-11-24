import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useVerTodosCursosQuery,
  useEliminarCursoMutation,
} from "../../../redux/features/cursos/cursosApi";
import Loader from "../../components/Loader/Loader";


import { styles } from "../../styles/style";

import Link from 'next/link';
import { format, register } from "timeago.js";
import * as timeago from "timeago.js";

import pt_BR from "timeago.js/lib/lang/pt_BR";
import { toast } from "react-hot-toast";

timeago.register("pt_BR", pt_BR);

type Props = {};

const TodosCursos = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [cursoId, setCursoId] = useState("");
  
  const {isLoading,data,refetch} = useVerTodosCursosQuery({},{refetchOnMountOrArgChange:true});
  const [eliminarCurso,{isSuccess, error}] = useEliminarCursoMutation();
  


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "titulo", headerName: "Curso", flex: 1 },
    { field: "ratings", headerName: "Avaliações", flex: 0.5 },

    { field: "comprado", headerName: "Vendas", flex: 0.5 },
    { field: "createdAt", headerName: "Data", flex: .5 },

    {
      field: "  ",
      headerName: "Editar",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/editar-curso/${params.row.id}`}>
              <AiOutlineEdit size={20} className="dark:text-white text-black" />
            </Link>
          </>
        );
      },
    },

    {
      field: "",
      headerName: "Apagar",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
            onClick={() => {
              setOpen(!open);
              setCursoId(params.row.id);
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
  ];

  const rows:any = [];

  {
    data && data.cursos.forEach((item:any) => {
      rows.push({
        id: item._id,
        titulo: item.nome,
        comprado: item.comprado,
        ratings: item.ratings,
        createdAt: item.createdAt,
      });
    });
  }

  useEffect(() => {
    if(isSuccess){

      setOpen(false);
      refetch();
      toast.success("Curso Eliminado");
    }
    if(error){
      if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
      
    }
  },[isSuccess,error,refetch]);

  const handleEliminar = async () => {
    const id = cursoId;
    await eliminarCurso(id);
  };

  
  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box mt="20px">
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
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -traslate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px]">
                <h1 className={`${styles.titulo}`}>
                  Tens certeza que desejas apagar este curso?
                </h1>
                <div className="flex w'full items-center justify-between mb-6">
                  <div
                    className={`${styles.button}`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancelar
                  </div>

                  <div
                    className={`${styles.button} !bg-[#d21717]`}
                    onClick={handleEliminar}
                  >
                    Eliminar
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default TodosCursos;
