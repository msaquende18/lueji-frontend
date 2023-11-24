import Link from 'next/link';
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Sobre Nós
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/sobre"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Nossa História
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termos-privacidade"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Termos & Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Outros Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/cursos"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/perfil"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Minha Conta
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Redes Sociais
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Linkedin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
                Contactos Info:
              </h3>
              <p className="text-base  text-black dark:text-gray-300 dark:hover:text-white pb-2">
                {" "}
                Tel. +244 939-181-313{" "}
              </p>
              <p className="text-base  text-black dark:text-gray-300 dark:hover:text-white pb-2">
                {" "}
                Localização: Luandas, Belas{" "}
              </p>
              <p className="text-base  text-black dark:text-gray-300 dark:hover:text-white pb-2">
                {" "}
                Email: lueji.apoio@gmail.com{" "}
              </p>
            </div>
          </div>
          <br />
        </div>
        <p className="text-center  text-black dark:text-gray-300 dark:hover:text-white">
          Copyright &copy; 2023 Academia Lueji | By Marcelino Saquende.
        </p>
      </div>
      <br />
    </footer>
  );
}

export default Footer