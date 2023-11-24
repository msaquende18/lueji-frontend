"use client";
import React, { FC, useState, useEffect } from "react";
import CursoInfo from "../../criar-curso/CursoInfo";
import CursoOptions from "../../criar-curso/CursoOptions";
import DadosDoCurso from "../../criar-curso/DadosDoCurso";
import ConteudoDoCurso from "../../criar-curso/ConteudoDoCurso";
import VisaoGeralCurso from "../../criar-curso/VisaoGeralCurso";
import {
  useEditarCursoMutation,
  useVerTodosCursosQuery,
} from "../../../../redux/features/cursos/cursosApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditarCurso: FC<Props> = ({ id }) => {
  const [editarCurso, { isSuccess, error }] = useEditarCursoMutation();

  const { isLoading, data, refetch } = useVerTodosCursosQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const editarCursoDados = data && data.cursos.find((i: any) => i._id === id);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Curso actualizado com sucesso!!!");
      redirect("/admin/cursos");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  const [activo, setActivo] = useState(0);

  useEffect(() => {
    if (editarCursoDados) {
      setCursoInfo({
        nome: editarCursoDados.nome,
        descricao: editarCursoDados.descricao,
        categorias: editarCursoDados.categorias,
        preco: editarCursoDados.preco,
        precoEstimado: editarCursoDados?.precoEstimado,
        tags: editarCursoDados.tags,
        thumbnail: editarCursoDados?.thumbnail?.url,
        nivel: editarCursoDados.nivel,
        demoUrl: editarCursoDados.demoUrl,
      });
      setBeneficios(editarCursoDados.beneficios);
      setPrerequisitos(editarCursoDados.prerequisitos);
      setConteudoDoCurso(editarCursoDados.cursoDados);
    }
  }, [editarCursoDados]);

  const [cursoInfo, setCursoInfo] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categorias: "",
    precoEstimado: "",
    tags: "",
    nivel: "",
    demoUrl: "",
    thumbnail: "",
  });
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

        videoSection: dadosDoConteudoDoCurso.videoSection,
        videoLength: dadosDoConteudoDoCurso.videoLength,
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

    if (!isLoading) {
      await editarCurso({ id: editarCursoDados?._id, data: dados });
    }
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
            isEditar={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CursoOptions activo={activo} setActivo={setActivo} />
      </div>
    </div>
  );
};

export default EditarCurso;
