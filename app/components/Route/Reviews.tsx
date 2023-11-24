import Image from "next/image";
import React from "react";
import { styles } from "../../styles/style";
import ReviewsCard from "../Reviews/ReviewsCard";

type Props = {};

export const reviews = [
  {
    nome: "Jonh Doe",
    avatar: "https://randomuser.me/api//portraits/men/5.jpg",
    profissao: "Estudante | Universidade de Luanda",
    comentario:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque animi tenetur impedit!",
  },
  {
    nome: "Ana Doe",
    avatar: "https://randomuser.me/api//portraits/women/6.jpg",
    profissao: "Estudante | Universidade de Luanda",
    comentario:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque animi tenetur impedit!",
  },
  {
    nome: "Jonh Doe",
    avatar: "https://randomuser.me/api//portraits/men/2.jpg",
    profissao: "Estudante | Universidade de Luanda",
    comentario:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque animi tenetur impedit!",
  },
  {
    nome: "Ana Doe",
    avatar: "https://randomuser.me/api//portraits/women/8.jpg",
    profissao: "Estudante | Universidade de Luanda",
    comentario:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque animi tenetur impedit!",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[50%] ">
          <Image
            src={require("../../../public/assets/alumni.png")}
            alt="ReviewsImagem"
            width={700}
            height={700}
          />
        </div>
        <div className="w-full 800px:w-[50%] ">
          <h3 className={`${styles.titulo}  800px:!text-[40px]`}>
            Nossos alunos são os nossos principais{" "}
            <span className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              projectos
            </span>{" "}
            <br /> Veja o que eles dizem sobre nós.
          </h3>
          <br />
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0 md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((i, index) => <ReviewsCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
