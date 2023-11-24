import React, { useState } from "react";
import {useVerConteudoDoCursoQuery} from '../../redux/features/cursos/cursosApi';
import Loader from '../components/Loader/Loader';
import Heading from '../utils/Heading';
import CursoConteudoMedia from './CursoConteudoMedia';
import Header from '../components/home/header/Header';
import ListaDosCursos from '../components/Cursos/ListaDosCursos';
import Footer from "../components/Footer/Footer";

type Props = {
    id: string;
}

const CursoConteudo = ({id}: Props) => {
    const { isLoading, data: cursoDados } = useVerConteudoDoCursoQuery(id);
    const data = cursoDados?.conteudo;
    const [videoActivo, setVideoActivo] = useState(0);
    const [open, setOpen] = useState(false);
   const [activarItem, setActivarItem] = useState(0);
    const [route, setRoute] = useState("Login");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activarItem={activarItem}
            setRoute={setRoute}
            route={route}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              titulo={data[videoActivo]?.titulo}
              descricao="Lueji é uma plataforma para estudantes para aprender e receber ajuda de formadores"
              palavrasChaves={data[videoActivo]?.tags}
            />
            <div className="col-span-7">
              <CursoConteudoMedia
                data={data}
                id={id}
                videoActivo={videoActivo}
                setVideoActivo={setVideoActivo}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <ListaDosCursos data={data}  setVideoActivo={setVideoActivo} videoActivo={videoActivo} />
            </div>
          </div>
          <Footer/>
        </>
      )}
    </>
  );
}

export default CursoConteudo