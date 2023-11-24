import React, {FC, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BiSearch } from 'react-icons/bi'
import {useRouter} from "next/navigation";



type Props = {}

const Hero: FC<Props> = (props) => {

  const [pesquisar, setPesquisar] = useState("");
  const router = useRouter();

  const handlePesquisar = () => {
    if(pesquisar === ""){
      return
    }else{
      router.push(`/cursos?titulo=${pesquisar}`);
    }

  }

  return (
    <div className="w-full 1000px:flex">
      <div className="1000px:w-[60%] flex flex-col items-center  1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white items-center mt-10 text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%]">
          Melhore as tuas habilidades fazendo os nossos melhores cursos online
        </h2>

        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
          Temos uma variedade de cursos que vão mudar o seu rumo
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="pesquisar"
            value={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
            placeholder="Pesquisar Cursos..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div
            className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] 
          
          "
            onClick={handlePesquisar}
          >
            <BiSearch className="text-white" size={30} />
          </div>
        </div>

        <br />
        <br />

        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src={require("../../../../public/assets/client-1.jpg")}
            alt=""
            className="rounded-full"
          />
          <Image
            src={require("../../../../public/assets/client-2.jpg")}
            alt=""
            className=" rounded-full ml-[-20px] "
          />
          <Image
            src={require("../../../../public/assets/client-1.jpg")}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <p className=" font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600] ">
            100+ Alunos já foram registrados.{" "}
            <Link href="/cursos" className="dark:text-[#46e256] text-[crimson]">
              Ver Cursos
            </Link>{" "}
          </p>
        </div>

        <br />
      </div>
    </div>
  );
};

export default Hero