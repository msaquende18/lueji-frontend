import React, { FC } from "react";
import { styles } from "../../styles/style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-hot-toast";

type Props = {
  beneficios: { titulo: string }[];
  setBeneficios: (beneficios: { titulo: string }[]) => void;
  prerequisitos: { titulo: string }[];
  setPrerequisitos: (prerequisitos: { titulo: string }[]) => void;
  activo: number;
  setActivo: (activo: number) => void;
};

const DadosDoCurso: FC<Props> = ({
  beneficios,
  setBeneficios,
  prerequisitos,
  setPrerequisitos,
  activo,
  setActivo,
}) => {
  const handleBeneficiosChange = (index: number, value: any) => {
    const actualizarBeneficios = [...beneficios];

    actualizarBeneficios[index].titulo = value;
    setBeneficios(actualizarBeneficios);
  };

  const handleAdicionarBeneficios = () => {
    setBeneficios([...beneficios, { titulo: "" }]);
  };

  const handlePrerequisitosChange = (index: number, value: any) => {
    const actualizarPrerequisitos = [...prerequisitos];

    actualizarPrerequisitos[index].titulo = value;
    setPrerequisitos(actualizarPrerequisitos);
  };

  const handleAdicionarPrerequisitos = () => {
    setPrerequisitos([...prerequisitos, { titulo: "" }]);
  };

  const botaoVoltar = () => {
    setActivo(activo - 1);
  };
  const handleOptions = () => {
    if (
      beneficios[beneficios.length - 1]?.titulo !== "" &&
      prerequisitos[prerequisitos.length - 1]?.titulo !== ""
    ) {
      setActivo(activo + 1);
    } else {
      toast.error("Preencha todos os campos!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label htmlFor="" className={`${styles.label} text-[20px]`}>
          Quais são os benefícios deste curso?
        </label>
        <br />
        {beneficios.map((beneficio: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefício"
            placeholder="Ao fazer este curso estarias habilitado a fazer o seu própio negócio!"
            required
            className={`${styles.input} my-2`}
            value={beneficio.titulo}
            onChange={(e) => handleBeneficiosChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handleAdicionarBeneficios}
        />
      </div>
      <div>
        <label htmlFor="" className={`${styles.label} text-[20px]`}>
          Quais são os pré-requisitos para começar este curso?
        </label>
        <br />
        {prerequisitos.map((prerequisito: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisito"
            placeholder="Ao fazer este curso estarias habilitado a fazer o seu própio negócio!"
            required
            className={`${styles.input} my-2`}
            value={prerequisito.titulo}
            onChange={(e) => handlePrerequisitosChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handleAdicionarPrerequisitos}
        />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => botaoVoltar()}
        >
          voltar
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Próximo
        </div>
      </div>
    </div>
  );
};

export default DadosDoCurso;
