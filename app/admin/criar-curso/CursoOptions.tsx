import React,{FC} from 'react';
import { IoMdCheckmark } from 'react-icons/io';


type Props = {
  activo: number;
  setActivo: (activo: number) => void;
}

const CursoOptions: FC<Props> = ({ activo, setActivo }) => {
  const opcoes = [
    "Informação do Curso",
    "Opções do Curso",
    "Conteúdo do Curso",
    "Visão Geral do Curso",
  ];
  return (
    <div>
      {opcoes.map((opcao: any, index: number) => (
        <div key={index} className={`w-full flex py-5`}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              activo + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px]" />
            {index !== opcoes.length && (
              <div
                className={`absolute h-[30px] w-1 ${
                  activo + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 ${
              activo === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            } text-[20px]`}
          >
            {opcao}
          </h5>
        </div>
      ))}
    </div>
  );
}

export default CursoOptions