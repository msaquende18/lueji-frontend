import React, { FC } from "react";
import CursoPlayer from "../../utils/CursoPlayer";
import { styles } from "../../styles/style";
import Ratings from '../../utils/Ratings'
import {IoCheckmarkDoneOutline} from 'react-icons/io5';

type Props = {
  cursoDados: any;
  activo: number;
  setActivo: (activo: number) => void;
  handleCriarCurso: any;
  isEditar: boolean;
};

const VisaoGeralCurso: FC<Props> = ({
  cursoDados,
  activo,
  setActivo,
  handleCriarCurso,
  isEditar,
}) => {
  const descontoPercentagem =
    ((cursoDados?.precoEstimado - cursoDados?.preco) /
      cursoDados?.precoEstimado) *
    100;

  const descontoPercentagemPreco = descontoPercentagem.toFixed(0);

  const botaoVoltar = () => {
    setActivo(activo - 1);
  };
  const criarCurso = () => {
    handleCriarCurso();
  };
  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CursoPlayer
            videoUrl={cursoDados?.demoUrl}
            titulo={cursoDados?.titulo}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {cursoDados?.preco === 0 ? "Gratuito" : cursoDados?.preco + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {cursoDados?.precoEstimado}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {descontoPercentagemPreco}% Off
          </h4>
        </div>
        <div className="flex item-center">
          <div
            className={`${styles.button} my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Comprar {cursoDados?.preco}$
          </div>
        </div>
        <div className="flex item-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Disconto code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[50%] ml-3 !mt-0`}
          />
          <div className={`${styles.button}  ml-4 font-Poppins cursor-pointer`}>
            Aplicar
          </div>
        </div>
        <p className="pb-1 font-Poppins text-black dark:text-[#fff]">
          Link do Material Incluído
        </p>
        <p className="pb-1 font-Poppins text-black dark:text-[#fff]">
          Acesso Ilimitado
        </p>
        <p className="pb-1 font-Poppins text-black dark:text-[#fff]">
          Certificado de conclusão de curso
        </p>
        <p className="pb-1 font-Poppins text-black dark:text-[#fff]">
          Premium Suporte
        </p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px]  font-Poppins font-[600]">
            {cursoDados?.nome}
          </h1>
          <div className="flex items-center">
            <Ratings rating={0} />
            <h5 className="font-Poppins text-black dark:text-[#fff]">
              0 Avaliações
            </h5>
          </div>
          <h5 className="font-Poppins text-black dark:text-[#fff]">
            0 Estudantes
          </h5>
        </div>
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]  text-black dark:text-[#fff]">
          O que vais aprender neste curso?
        </h1>
      </div>
      {cursoDados?.beneficios?.map((item: any, index: number) => (
        <div className="w-full flex 800px:items-center py-2" key={index}>
          <div className="w-[15px] mr-1">
            <IoCheckmarkDoneOutline
              size={20}
              className="text-black dark:text-[#fff]"
            />
          </div>
          <p className="pl-2 font-Poppins text-black dark:text-[#fff]">
            {item.titulo}
          </p>
        </div>
      ))}
      <br />
      <br />
      <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-[#fff]">
        Quais são os pré-requisitos para começar este curso?
      </h1>
      {cursoDados?.prerequisitos?.map((item: any, index: number) => (
        <div className="w-full flex 800px:items-center py-2" key={index}>
          <div className="w-[15px] mr-1">
            <IoCheckmarkDoneOutline
              size={20}
              className="text-black dark:text-[#fff]"
            />
          </div>
          <p className="pl-2 font-Poppins text-black dark:text-[#fff]">
            {item.titulo}
          </p>
        </div>
      ))}
      {/* Descrição */}
      <div className="w-full">
        <h1 className="text-[25px] font-Poppins text-black dark:text-[#fff] font-[600]">
          Detalhes do curso
        </h1>
        <p className="text-[25px] mt-[20px] whitespace-pre-line w-full font-Poppins text-black dark:text-[#fff] overflow-hidden">
          {cursoDados?.descricao}
        </p>
      </div>
      <br />
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => botaoVoltar()}
        >
          voltar
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => criarCurso()}
        >
          {isEditar ? "Actualizar" : "Finalizar"}
        </div>
      </div>
    </div>
  );
};

export default VisaoGeralCurso;
