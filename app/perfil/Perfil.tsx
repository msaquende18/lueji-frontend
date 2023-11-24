'use client'
import React, { FC, useState, useEffect } from "react";
import SideUsuarioPerfil from "./SideUsuarioPerfil";
import { useLogOutQuery } from '../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import {redirect} from 'next/navigation';
import InfoPerfil from './InfoPerfil';
import MudarPalavraPasse from './MudarPalavraPasse';
import CursoCard from '../components/Cursos/CursoCard';
import { useVerCursosQuery } from "../../redux/features/cursos/cursosApi";

type Props = {
  usuario:any;
}

const Perfil: FC<Props> = ({usuario}) => {
  const [scroll, setScroll] = useState(false);
  const [logout, setLogout] = useState(false);
  const [cursos, setCursos] = useState([]);
  const {data, isLoading} = useVerCursosQuery(undefined,{});
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
    
  });

  

  const [avatar, setAvatar] = useState(null);
  const [activo, setActivo] = useState(1);



  const logOutHandler = async () => {
    
    setLogout(true);  
    await signOut();
      
    
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if(data){
      const filtrarCursos = usuario.cursos
        .map((listaCursoUsuario: any) =>
          data.cursos.find((curso: any) => curso._id === listaCursoUsuario._id)
        )
        .filter((curso: any) => curso !== undefined);
      setCursos(filtrarCursos);
    }
  }, [data]);
  

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014]  rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideUsuarioPerfil
          usuario={usuario}
          activo={activo}
          avatar={avatar}
          setActivo={setActivo}
          logOutHandler={logOutHandler}
        />
      </div>

      {activo === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <InfoPerfil avatar={avatar} usuario={usuario} />
        </div>
      )}
      {activo === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <MudarPalavraPasse />
        </div>
      )}
      {activo === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px]  1500px:grid-cols-3 1500px:gap-[35px] mb-12 border-0">
            {cursos &&
              cursos?.map((item: any, index: number) => (
                <>
                  <CursoCard item={item} key={index} isProfile={true} />
                </>
              ))}
          </div>
          {cursos && cursos.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins">
              Não Tens Nenhum Curso Comprado Ainda!
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Perfil