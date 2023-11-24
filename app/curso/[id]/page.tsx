'use client'
import React from 'react';
import CursoDetalhes from '../../components/Cursos/CursoDetalhes';

const Page = ({params}:any) => {
    
    
   return (
 <div>
    <CursoDetalhes id={params.id} />
   </div>
   )
}

export default Page;