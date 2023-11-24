import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { styles } from "../styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../public/assets/avatar-profile.jpg";
import {
  useActualizarAvatarMutation,
  useEditarPerfilMutation,
} from "../../redux/features/usuario/usuarioApi";
import { useCarregarUsuarioQuery } from "../../redux/features/api/apiSlice";
import { toast } from "react-hot-toast";


type Props = {
  avatar: string | null;
  usuario: any;
};

const InfoPerfil: FC<Props> = ({ avatar, usuario }) => {
  const [nome, setNome] = useState(usuario && usuario.nome);
  const [actualizarAvatar, { isSuccess, error }] =
    useActualizarAvatarMutation();
  const [carregarUsuario, setCarregarUsuario] = useState(false);
  const [editarPerfil, { isSuccess: successoPerfil, error: erroDoPerfil }] =
    useEditarPerfilMutation();
  const {} = useCarregarUsuarioQuery(undefined, {
    skip: carregarUsuario ? false : true,
  });

  const imagemHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        actualizarAvatar(
         avatar,
        );
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || successoPerfil) {
      setCarregarUsuario(true);
    }
    if (error || erroDoPerfil) {
      console.log(error);
    }
    if(successoPerfil){
      toast.success("Perfil actualizado!!!");
    }
  }, [isSuccess, error, successoPerfil, erroDoPerfil]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(nome !== ""){
        await editarPerfil({
            nome: nome
        });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              usuario.avatar || avatar
                ? usuario.avatar.url || avatar
                : avatarIcon
            }
            width={120}
            height={120}
            alt=""
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imagemHandler}
            accept="image/png,image/jpg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-1 text-black dark:text-[#fff]">
                Nome Completo
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-1 text-black dark:text-[#fff]">
                Email{" "}
              </label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={usuario?.email}
              />
            </div>
            <input
              className={`${styles.button} mt-3`}
              required
              value="Actualizar"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default InfoPerfil;
