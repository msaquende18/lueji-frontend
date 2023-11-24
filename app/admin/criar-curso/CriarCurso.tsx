"use client";
import React, { useState, useEffect } from "react";
import CursoInfo from "./CursoInfo";
import CursoOptions from "./CursoOptions";
import DadosDoCurso from "./DadosDoCurso";
import ConteudoDoCurso from "./ConteudoDoCurso";
import VisaoGeralCurso from "./VisaoGeralCurso";
import { useCriarCursoMutation } from "../../../redux/features/cursos/cursosApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};

const CriarCurso = (props: Props) => {
  const [criarCurso, { isLoading, isSuccess, error }] = useCriarCursoMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Curso criado com sucesso!");
      // redirect("/admin/cursos");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  const [activo, setActivo] = useState(0);
  const [cursoInfo, setCursoInfo] = useState({
    nome: "",
    descricao: "",
    categorias:"",
    preco: "",
    precoEstimado: "",
    tags: "",
    nivel: "",
    demoUrl: "",
    thumbnail: "",
  });
  console.log(cursoInfo);
  const [beneficios, setBeneficios] = useState([{ titulo: "" }]);
  const [prerequisitos, setPrerequisitos] = useState([{ titulo: "" }]);
  const [conteudoDoCurso, setConteudoDoCurso] = useState([
    {
      videoUrl: "",
      titulo: "",
      videoSection: "",
      videoLength: "",
      descricao: "",
      
      links: [
        {
          titulo: "",
          url: "",
        },
      ],
      sugestao: "",
    },
  ]);

  const [cursoDados, setCursoDados] = useState({});

  const handleSubmit = async () => {
    // Formatar beneficio (Array para Objecto)
    const beneficioFormato = beneficios.map((beneficio) => ({
      titulo: beneficio.titulo,
    }));

    // Formatar prerequisitos (Array para Objecto)
    const prerequisitosFormato = prerequisitos.map((prerequisito) => ({
      titulo: prerequisito.titulo,
    }));

    // Formatar conteudo do curso (Array para Objecto)
    const conteudoDoCursoFormato = conteudoDoCurso.map(
      (dadosDoConteudoDoCurso) => ({
        videoUrl: dadosDoConteudoDoCurso.videoUrl,
        titulo: dadosDoConteudoDoCurso.titulo,
        descricao: dadosDoConteudoDoCurso.descricao,
        videoLength: dadosDoConteudoDoCurso.videoLength,
        videoSection: dadosDoConteudoDoCurso.videoSection,
        links: dadosDoConteudoDoCurso.links.map((link) => ({
          titulo: link.titulo,
          url: link.url,
        })),
        sugestao: dadosDoConteudoDoCurso.sugestao,
      })
    );

    // preparar os dados do objecto
    const dados = {
      nome: cursoInfo.nome,
      descricao: cursoInfo.descricao,
      categorias: cursoInfo.categorias,
      preco: cursoInfo.preco,
      precoEstimado: cursoInfo.precoEstimado,
      tags: cursoInfo.tags,
      thumbnail: cursoInfo.thumbnail,
      nivel: cursoInfo.nivel,
      demoUrl: cursoInfo.demoUrl,
      totalVideos: conteudoDoCurso.length,
      beneficios: beneficioFormato,
      prerequisitos: prerequisitosFormato,
      cursoDados: conteudoDoCursoFormato,
    };
    setCursoDados(dados);
  };

  const handleCriarCurso = async (e: any) => {
    const dados = cursoDados;
    if (!isLoading){ 
      await criarCurso(dados)
      };
  };
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {activo == 0 && (
          <CursoInfo
            cursoInfo={cursoInfo}
            setCursoInfo={setCursoInfo}
            activo={activo}
            setActivo={setActivo}
          />
        )}
        {activo == 1 && (
          <DadosDoCurso
            beneficios={beneficios}
            setBeneficios={setBeneficios}
            prerequisitos={prerequisitos}
            setPrerequisitos={setPrerequisitos}
            activo={activo}
            setActivo={setActivo}
          />
        )}
        {activo == 2 && (
          <ConteudoDoCurso
            conteudoDoCurso={conteudoDoCurso}
            setConteudoDoCurso={setConteudoDoCurso}
            activo={activo}
            setActivo={setActivo}
            handleSubmit={handleSubmit}
          />
        )}
        {activo == 3 && (
          <VisaoGeralCurso
            cursoDados={cursoDados}
            activo={activo}
            setActivo={setActivo}
            handleCriarCurso={handleCriarCurso}
            isEditar={false}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CursoOptions activo={activo} setActivo={setActivo} />
      </div>
    </div>
  );
};

export default CriarCurso;
