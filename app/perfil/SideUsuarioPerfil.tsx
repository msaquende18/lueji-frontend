import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from '../../public/assets/avatar-profile.jpg'
import {RiLockPasswordLine} from 'react-icons/ri';
import {SiCoursera} from 'react-icons/si';
import {AiOutlineLogout} from 'react-icons/ai';
import {MdOutlineAdminPanelSettings} from 'react-icons/md';
import Link from "next/link";

type Props = {
  usuario: any;
  activo: number;
  avatar: string | null;
  setActivo: (activo: number) => void;
  logOutHandler: any;
};

const SideBarPerfil: FC<Props> = ({
  usuario,
  activo,
  avatar,
  setActivo,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activo === 1 ? "dark:bg-slate-800 bg-[#9dc4c6]" : "bg-transparent"
        }`}
        onClick={() => setActivo(1)}
      >
        <Image
          src={
            usuario.avatar || avatar
              ? usuario.avatar.url || avatar
              : avatarDefault
          }
          width={20}
          height={20}
          alt=""
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Minha Conta
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activo === 2 ? "dark:bg-slate-800 bg-[#9dc4c6]" : "bg-transparent"
        } `}
        onClick={() => setActivo(2)}
      >
        <RiLockPasswordLine
          size={20}
          className={` dark:text-white text-[#406392] `}
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Mudar Palavra passe
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activo === 3 ? "dark:bg-slate-800 bg-[#9dc4c6]" : "bg-transparent"
        } `}
        onClick={() => setActivo(3)}
      >
        <SiCoursera size={20} className={` dark:text-white text-[#406392] `} />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Cursos Inscritos
        </h5>
      </div>
      {usuario.funcao === "admin" && (
        
          <Link
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              activo === 5 ? "dark:bg-slate-800 bg-[#9dc4c6]" : "bg-transparent"
            } `}
           href={"/admin"}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              className={` dark:text-white text-[#406392] `}
            />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
              Admin Dashboard
            </h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activo === 4 ? "dark:bg-slate-800 bg-[#9dc4c6]" : "bg-transparent"
        } `}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout
          size={20}
          className={` dark:text-white text-[#406392] `}
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Sair
        </h5>
      </div>
    </div>
  );
};

export default SideBarPerfil;
