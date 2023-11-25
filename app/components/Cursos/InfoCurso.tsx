import CursoPlayer from "../../utils/CursoPlayer";
import Ratings from "../../utils/Ratings";
import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import {styles} from '../../styles/style';
import Link from 'next/link';
import ListaDosCursos from "./ListaDosCursos";
import { Elements} from '@stripe/react-stripe-js';
import CheckOutForm from "../pagamentos/CheckOutForm";
import {useCarregarUsuarioQuery} from '../../../redux/features/api/apiSlice';

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;

              setOpen:any;
              
              setRoute:any;
              
};

const InfoCurso = ({
  data,
  stripePromise,
  clientSecret,
  setOpen:openAuthModal,
  setRoute,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { usuario } = useSelector((state: any) => state.auth);
  // const {data:dadosDoUsuario} = useCarregarUsuarioQuery(undefined,{});
  // const usuario = dadosDoUsuario?.usuario;
  const descontoPercentagem =
    ((data?.precoEstimado - data?.preco) / data?.precoEstimado) * 100;

  const descontoPercentagemPreco = descontoPercentagem.toFixed(0);

  const comprado =
    usuario && usuario?.cursos.find((item: any) => item._id === data._id);

  const handlerPedido = () => {
    if (usuario) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-[#fff]">
              {data?.nome}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-black dark:text-[#fff]">
                  {data?.reviews?.length} Avaliação
                </h5>
              </div>
            </div>
            <br />
            {/* <h5 className="text-black dark:text-[#fff]">
              {data?.comprado} Estudantes
            </h5> */}
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-[#fff]">
              O que vai aprender neste curso?
            </h1>
            <div>
              {data?.beneficios?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-[#fff]"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-[#fff]">
                    {item.titulo}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-[#fff]">
              Quais são os pré-requisos para fazer este curso?
            </h1>
            <div>
              {data?.prerequisitos?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-[#fff]"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-[#fff]">
                    {item.titulo}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>

            <div>
              <h1
                className="text-[25px] font-Poppins font-[600] text-black
                dark:text-[#fff]"
              >
                Visão Geral do Curso
              </h1>
              {/* Lista dos Cursos */}

              <ListaDosCursos data={data?.cursoDados} isDemo={true} />
              <br />
              <br />

              {/* Lista dos Cursos */}
            </div>
            <div className="w-full">
              <h1
                className="text-[25px] font-Poppins font-[600] text-black
                dark:text-[#fff]"
              >
                Detalhes do Curso
              </h1>
              <p
                className="w-full text-[18px] font-Poppins mt-[20px] whitespace-pre-line overflow-hidden text-black
                dark:text-[#fff]"
              >
                {data?.descricao}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-[#fff]">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Classificação do Curso • {data?.reviews?.length} Avaliações
                </h5>
              </div>
              <br />
              {data?.reviews
                ? [...data.reviews]
                    .reverse()
                    .map((item: any, index: number) => (
                      <div className="w-full pb-4" key={index}>
                        <div className="flex">
                          <div className="w-[50px] h-[50px]">
                            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                              <h1 className="uppercase text-[18px] text-black dark:text-white">
                                {item.usuario.nome.slice(0, 2)}
                              </h1>
                            </div>
                          </div>
                          <div className="hidden 800px:block pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[25px] font-Poppins text-black dark:text-[#fff]">
                                {item?.usuario?.nome}
                              </h5>
                              <Ratings rating={item.ratings} />
                            </div>
                            <p className="text-black dark:text-[#fff]">
                              {item?.comentario}
                            </p>
                            <small className="text-[#000000d1] dark:text-[#ffffff83]">
                              {format(item?.createdAt)}
                            </small>
                          </div>
                          <div className="pl-2 flex 800px:hidden items-center">
                            <h5 className="text-[18px] pr-2 font-Poppins text-black dark:text-[#fff]">
                              {item?.usuario?.nome}
                            </h5>
                            <Ratings rating={item?.ratings} />
                          </div>
                        </div>
                      </div>
                    ))
                : null}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CursoPlayer videoUrl={data?.demoUrl} titulo={data?.titulo} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] font-Poppins text-black dark:text-[#fff]">
                  {data?.preco === 0 ? "Gratuito" : data?.preco + ""}
                </h1>
                {/* <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 font-Poppins text-black dark:text-[#fff]">
                  {data?.precoEstimado}$
                </h5> */}
                <h5 className="pl-3 text-[14px] mt-[-5px] opacity-80 text-[crimson] dark:text-[crimson]">
                  Brevemente
                </h5>
                {/* <h4 className="pl-5 pt-4 text-[22px] font-Poppins text-black dark:text-[#fff]">
                  {descontoPercentagemPreco}% Off
                </h4> */}
              </div>
              <div className="flex item-center">
                {comprado ? (
                  <Link
                    className={`${styles.button} my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
                    href={`/curso-acesso/${data._id}`}
                  >
                    Entrar no curso
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
                    onClick={handlerPedido}
                  >
                    Inscreva-se já
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-[#fff]">
                + Suporte Premium
              </p>

              <p className="pb-1 text-black dark:text-[#fff]">
                + Certificado após conclusão do curso
              </p>
              <p className="pb-1 text-black dark:text-[#fff]">
                + Link do Material
              </p>
              <p className="pb-1 text-black dark:text-[#fff]">
                + Acesso Ilimitado
              </p>
            </div>
          </div>
        </div>
      </div>

      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default InfoCurso;
