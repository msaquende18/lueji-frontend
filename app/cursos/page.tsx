'use client'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useVerDadosLayoutQuery } from "../../redux/features/layout/layoutApi";
import Loader from '../components/Loader/Loader';
import Header from '../components/home/header/Header';
import {styles} from '../styles/style';
import CursoCard from '../components/Cursos/CursoCard';
import { useVerCursosQuery } from '../../redux/features/cursos/cursosApi';
import Footer from '../components/Footer/Footer';

type Props ={}

const Page = (props: Props) => {
    const searchParams = useSearchParams();
    const pesquisar = searchParams?.get("titulo");
    const {data, isLoading} = useVerCursosQuery(undefined,{});
    const {data:dadosDaCategoria} = useVerDadosLayoutQuery("Categorias",{});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [cursos, setCursos] = useState([]);
    const [categoria, setCategoria] = useState("Todos");

    useEffect(() => {
     if(categoria === "Todos") {
      setCursos(data?.cursos);
     }
     if(categoria !== "Todos"){
      setCursos(data?.cursos.filter((item: any) => item.categorias === categoria));
     }
     if(pesquisar){
      setCursos(data?.cursos.filter((item: any) => item.nome.toLowerCase().includes(pesquisar.toLowerCase())));
     }

    }, [data, categoria, pesquisar])
    
    const categorias = dadosDaCategoria?.layout.categorias;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activarItem={1}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  categoria === "Todos" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategoria("Todos")}
              >
                Todos
              </div>
              {categorias &&
                categorias.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        categoria === item.titulo
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategoria(item.titulo)}
                    >
                      {item.titulo}
                    </div>
                  </div>
                ))}
            </div>
            {cursos && cursos.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {pesquisar
                  ? "Curso não encontrado!"
                  : "Nenhum curso foi encontrado nessa categoria."}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0">
              {cursos &&
                cursos?.map((item: any, index: number) => (
                  <>
                    <CursoCard item={item} key={index} />
                  </>
                ))}
            </div>
          </div>
          <Footer/>
        </>
      )}
    </div>
  );
}

export default Page