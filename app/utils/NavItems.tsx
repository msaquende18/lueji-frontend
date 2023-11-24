import Link from 'next/link';
import React from 'react'
import { ThemeSwitcher } from './ThemeSwitcher';

type Props = {
    activarItem: number;
    isMobile: boolean;
}


export const navItemsDados = [
  {
    nome: "Início",
    url: "/",
  },
  {
    nome: "Cursos",
    url: "/cursos",
  },
  {
    nome: "Sobre Nós",
    url: "/sobre",
  },
  {
    nome: "FAQ",
    url: "/faq",
  },
];

const NavItems: React.FC<Props> = ({activarItem, isMobile}) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsDados &&
          navItemsDados.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activarItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.nome}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white `}
              >
                Lueji
              </span>{" "}
            </Link>
          </div>
          {navItemsDados &&
            navItemsDados.map((i, index) => (
              <Link href="/" key={index} passHref>
                <span
                  className={`${
                    activarItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.nome}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
}

export default NavItems