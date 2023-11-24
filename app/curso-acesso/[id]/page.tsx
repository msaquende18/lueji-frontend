'use client'
import React,{useEffect} from 'react';
import {redirect} from 'next/navigation';
import { useCarregarUsuarioQuery } from "../../../redux/features/api/apiSlice";
import Loader from '../../components/Loader/Loader';
import CursoConteudo from "../CursoConteudo";


type Props = {
    params: any;
}

const Page = ({params}: Props) => {
    const id= params.id;

    const {isLoading,error,data} = useCarregarUsuarioQuery(undefined,{ });
    
    useEffect(() => {
        if(data){
            const comprado = data.usuario.cursos.find((item:any) => item._id === id);

            if(!comprado){
                redirect("/");
            }
            if(error){
                redirect("/");
            }
        }
    },[data,error]);
  return (
   <>
   {
    isLoading ? (
        <Loader />
    ): (
        <div>
            <CursoConteudo id={id} />
        </div>
    )
   }
   </>
  )
}

export default Page