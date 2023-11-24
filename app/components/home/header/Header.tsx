"use client";

import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../../../utils/NavItems";
import { ThemeSwitcher } from "../../../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../../../utils/CustomModal";
import Login from "../../auth/login/Login";
import Registar from "../../auth/registar/Registar";
import Verificacao from "../../auth/verificacao/Verificacao";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../../../public/assets/avatar-profile.jpg";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "../../../../redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import {redirect} from 'next/navigation';
import Perfil from "../../../perfil/page";
import Loader from '../../Loader/Loader';
import { useCarregarUsuarioQuery } from "../../../../redux/features/api/apiSlice";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activarItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activarItem, setOpen, open, route, setRoute }) => {
  const [activo, setActivo] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { usuario } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error, isLoading }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!usuario) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          nome: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (data !== null) {
      if (isSuccess) {
        toast.success("Bem vindo de volta!!!");
      } 
    }
    if(!usuario) {
      setLogout(true);
        
    }
  }, [data, usuario, socialAuth, isSuccess]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActivo(true);
      } else {
        setActivo(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  console.log(usuario);
  return (
    <div className="w-full relative">
      <div
        className={`${
          activo
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white `}
              >
                Lueji
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activarItem={activarItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Dispositivos Mobile  */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {usuario ? (
                <Link href={"/perfil"}>
                  <Image
                    src={usuario.avatar ? usuario.avatar.url : avatar}
                    width={30}
                    height={30}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{
                      border: activarItem === 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                </Link>
              ) : (
                // <HiOutlineUserCircle
                //   size={25}
                //   className="hidden 800px:block cursor-pointer ml-5 my-2 text-black dark:text-white "
                //   onClick={() => setOpen(true)}
                // />
                <button
                  className="hidden 800px:block py-3 px-7 rounded-full cursor-pointer bg-[#39c1f3]  text-[16px] font-Poppins font-semibold"
                  onClick={() => setOpen(true)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Sidebar  */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activarItem={activarItem} isMobile={true} />
              {usuario ? (
                <Link href={"/perfil"}>
                  <Image
                    src={usuario.avatar ? usuario.avatar.url : avatar}
                    width={30}
                    height={30}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                    style={{
                      border: activarItem === 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                </Link>
              ) : (
                // <HiOutlineUserCircle
                //   size={25}
                //   className="hidden 800px:block cursor-pointer ml-5 my-2 text-black dark:text-white "
                //   onClick={() => setOpen(true)}
                // />
                <button
                  className="hidden 800px:block py-3 px-7 rounded-full cursor-pointer bg-[#39c1f3]  text-[16px] font-Poppins font-semibold"
                  onClick={() => setOpen(true)}
                >
                  Login
                </button>
              )}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                &copy; 2023 Lueji Academy
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activarItem={activarItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Registar" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activarItem={activarItem}
              component={Registar}
            />
          )}
        </>
      )}
      {route === "Verificacao" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activarItem={activarItem}
              component={Verificacao}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
