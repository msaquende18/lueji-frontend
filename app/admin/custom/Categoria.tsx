import React, { useEffect, useState } from "react";
import { styles } from "../../styles/style";
import Loader from "../../components/Loader/Loader";
import {
  useEditarLayoutMutation,
  useVerDadosLayoutQuery,
} from "../../../redux/features/layout/layoutApi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-hot-toast";

type Props = {};

const Categoria = (props: Props) => {
  const { data, isLoading, refetch } = useVerDadosLayoutQuery("Categorias", {
    refetchOnMountOrArgChange: true,
  });

  const [editarLayout, { isSuccess: catLayoutSucesso, error }] =
    useEditarLayoutMutation();

  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    if (data?.layout?.categorias) {
      setCategorias(data.layout.categorias);
    }
    if (catLayoutSucesso) {
      toast.success("Categoria actualizado!!!");
      refetch();
    }
     if (error) {
       if ("data" in error) {
         const errorData = error as any;
         toast.error(errorData?.data?.message);
       }
     }
  }, [data, catLayoutSucesso, error,refetch ]);

  const handleAdicionarCategoria = (id: any, value: string) => {
    setCategorias((categoriaAnterior: any) =>
      categoriaAnterior.map((i: any) =>
        i._id === id ? { ...i, titulo: value } : i
      )
    );
  };

  const novaCategoriaHandler = () => {
    if (categorias[categorias.length - 1].titulo === "") {
      toast.error("O nome da categoria não deve estar vazia");
    } else{
        setCategorias((categoriaAnterior: any) => [...categoriaAnterior, {titulo:""}]);
    }
  };

  const naoTrocouCategoria = (
    categoriaOriginal: any[],
    novaCategoria: any[]
    ) => {
        return (
          JSON.stringify(categoriaOriginal) === JSON.stringify(novaCategoria)
        );
    };
  const algumaPerguntaVazia = (categorias: any) => {
    return categorias.some((q: any) => q.titulo === "");
  };
   const handleEditarCategoria = async () => {
      if(!naoTrocouCategoria(data.layout.categorias, categorias) && !algumaPerguntaVazia(categorias)){
        await editarLayout({
            tipo: "Categorias",
            categorias,
        });
      }
   };
  

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.titulo}`}>Categoria dos Cursos</h1>
          {categorias &&
            categorias.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.titulo}
                      onChange={(e) =>
                        handleAdicionarCategoria(item._id, e.target.value)
                      }
                      placeholder="Digite o nome da Categoria"
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategorias((categoriaAnterior: any) =>
                          categoriaAnterior.filter(
                            (i: any) => i._id !== item._id
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center ">
            <IoMdAddCircle
              className="w-8 h-8 dark:text-white text-black text-[18px] cursor-pointer"
              onClick={novaCategoriaHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            }  dark:text-[#fff] text-black bg-[#cccccc34]
            ${
              naoTrocouCategoria(data.layout.categorias, categorias) ||
              algumaPerguntaVazia(categorias)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#37a39a]"
            }
            !rounded absolute bottom-12 right-12
            `}
            onClick={
              naoTrocouCategoria(data.layout.categorias, categorias) ||
              algumaPerguntaVazia(categorias)
                ? () => null
                : handleEditarCategoria
            }
          >
            Guardar
          </div>
        </div>
      )}
    </>
  );
};

export default Categoria;
