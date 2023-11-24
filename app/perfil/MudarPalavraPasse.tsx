import React, { FC, useEffect, useState } from "react";
import { styles } from "../styles/style";
import {
  useActualizarPalavraPasseMutation
} from "../../redux/features/usuario/usuarioApi";
import { toast } from "react-hot-toast";


type Props = {};

const MudarPalavraPasse: FC<Props> = (props) => {
  const [antigaPalavraPasse, setAntigaPalavraPasse] = useState("");
  const [novaPalavraPasse, setNovaPalavraPasse] = useState("");
  const [confirmarPalavraPasse, setConfirmarPalavraPasse] = useState("");
  const [actualizarPalavraPasse, {isSuccess, error}] = useActualizarPalavraPasseMutation();

 

  const palalavraPasseHandler = async (e: any) => {
    e.preventDefault();
   if(novaPalavraPasse !== confirmarPalavraPasse){
    toast.error("Palavra passe não coincidem");
   } else {
    await actualizarPalavraPasse({ antigaPalavraPasse, novaPalavraPasse });
   }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Palavra alterada!");
    }
    if (error) {
      if ("data" in error) {
        const dadosDoErro = error as any;
        toast.error(dadosDoErro.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
        <h1 className="block text-[25px] 800px:-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
          Mudar a palavra passe
        </h1>
        <div className="w-full">
          <form
            onSubmit={palalavraPasseHandler}
            className="flex flex-col items-center"
          >
            <div className="w-[100%] 800px:w-[60%] mt-3">
              <label className="block pb-1 text-black dark:text-[#fff]">
                Palavra Passe Antiga{" "}
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-2 mt-0 800px:mb-0 `}
                required
                value={antigaPalavraPasse}
                onChange={(e) => setAntigaPalavraPasse(e.target.value)}
              />
            </div>

            <div className="w-[100%] 800px:w-[60%] mt-2">
              <label className="block pb-2 text-black dark:text-[#fff]">
               Nova Palavra Passe{" "}
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-2 mt-0 800px:mb-0 `}
                required
                value={novaPalavraPasse}
                onChange={(e) => setNovaPalavraPasse(e.target.value)}
              />
            </div>
            <div className="w-[100%] 800px:w-[60%] mt-2">
              <label className="block pb-2 text-black dark:text-[#fff]">
                Confirmar a Palavra passe{" "}
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-2 mt-0 800px:mb-0 `}
                required
                value={confirmarPalavraPasse}
                onChange={(e) => setConfirmarPalavraPasse(e.target.value)}
              />
            </div>

            <input
              className={`${styles.button} mt-3`}
              required
              value="Actualizar"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default MudarPalavraPasse;
