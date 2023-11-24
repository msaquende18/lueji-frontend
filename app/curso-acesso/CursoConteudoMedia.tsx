import React, { useState } from 'react'
import CursoPlayer from '../utils/CursoPlayer';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import {styles} from '../styles/style';


type Props = {
  data: any;
  id: string;

  videoActivo: number;
  setVideoActivo: (videoActivo:number) => void;
};

const CursoConteudoMedia = ({
  data,
  id,
  videoActivo,
  setVideoActivo,
}: Props) => {
    const [activoBar, setActivoBar] = useState(0) ;
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CursoPlayer
        titulo={data[videoActivo]?.videoUrl}
        videoUrl={data[videoActivo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] py-3 px-6 ${
            videoActivo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setVideoActivo(videoActivo === 0 ? 0 : videoActivo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2 mt-1" />
          Aula Anterior
        </div>
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] y-3 px-6  ${
            data.length - 1 === videoActivo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setVideoActivo(
              data && data.length - 1 === videoActivo
                ? videoActivo
                : videoActivo + 1
            )
          }
        >
          Próxima Aula
          <AiOutlineArrowRight className="ml-2 mt-1" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">
        {data[videoActivo].titulo}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Visão Geral", "Materiais", "Q&A", "Avaliação"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activoBar === index
                ? "text-[crimson]"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActivoBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />

      {activoBar === 0 && (
        <p className="text-[18px] dark:text-white text-black whitespace-pre-line mb-3">
          {data[videoActivo]?.descricao}
        </p>
      )}
      {activoBar === 1 && (
        <div>
          {data[videoActivo]?.links.map((item: any, index: number) => (
            <div key={index} className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.titulo && item.titulo + ":"}
              </h2>
              <a href={item.url} className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2">
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CursoConteudoMedia