import React from 'react';
import Image from "next/image";
import Ratings from "../../utils/Ratings";

type Props = {
    item:any;
}

const ReviewsCard = (props: Props) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="flex w-full ">
        <Image
          src={props.item.avatar}
          alt="ReviewsImagem"
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded object-cover"
        />

        {/* <div className="800px:flex justify-between w-full hidden">
        <div className="pl-4">
          <h5 className="text-[20px] text-black dark:text-white">
            {props.item.nome}
          </h5>
          <h6 className="text-[20px] text-black dark:text-white">
            {props.item.profissao}
          </h6>
        </div>
        <Ratings rating={4} />
        <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
          {props.item.comentario}
        </p>
      </div> */}

        {/* Para Mobile */}
        <div className="800px:flex justify-between w-full flex flex-col">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {props.item.nome}
            </h5>
            <h6 className="text-[20px] text-black dark:text-white">
              {props.item.profissao}
            </h6>
          </div>
          <Ratings rating={4} />
          <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
            {props.item.comentario}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewsCard