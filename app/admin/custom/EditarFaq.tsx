import React, { useState, useEffect } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { useEditarLayoutMutation, useVerDadosLayoutQuery } from "../../../redux/features/layout/layoutApi";
import { styles } from "../../styles/style";
import { toast } from "react-hot-toast";

interface FAQItem {
  _id: string;
  pergunta: string;
  resposta: string;
  activo: boolean;
}

const EditarFaq = () => {
 const { data, isLoading } = useVerDadosLayoutQuery("FAQ", {
   refetchOnMountOrArgChange: true,
 });

 const [editarLayout, { isSuccess: faqLayoutSucesso, error }] =
   useEditarLayoutMutation();

 const [perguntas, setPerguntas] = useState<FAQItem[]>([]);

 useEffect(() => {
   if (data?.layout?.faq) {
     setPerguntas(data.layout.faq);
   }
 }, [data]);

 const togglePerguntas = (id: string) => {
   setPerguntas((perguntas) =>
     perguntas.map((q) => (q._id === id ? { ...q, activo: !q.activo } : q))
   );
 };

 const handleMudarPergunta = (id: string, value: string) => {
   setPerguntas((perguntas) =>
     perguntas.map((q) => (q._id === id ? { ...q, pergunta: value } : q))
   );
 };

 const handleMudarResposta = (id: string, value: string) => {
   setPerguntas((perguntas) =>
     perguntas.map((q) => (q._id === id ? { ...q, resposta: value } : q))
   );
 };

 const novoFaqHandler = () => {
   setPerguntas([
     ...perguntas,
     {
       _id: (perguntas.length + 1).toString(),
       pergunta: "",
       resposta: "",
       activo: false,
     },
   ]);
 };

 const naoTrocouPergunta = (
   perguntaOriginal: FAQItem[],
   novaPergunta: FAQItem[]
 ) => {
   return JSON.stringify(perguntaOriginal) === JSON.stringify(novaPergunta);
 };

 const algumaPerguntaVazia = (perguntas: FAQItem[]) => {
   return perguntas.some((q) => q.pergunta === "" || q.resposta === "");
 };

 const handleEditar = async () => {
   if (
     !naoTrocouPergunta(data?.layout?.faq || [], perguntas) &&
     !algumaPerguntaVazia(perguntas)
   ) {
     try {
       const updatedFaqData = perguntas.map(
         ({ _id, pergunta, resposta, activo }) => ({
           _id,
           pergunta,
           resposta,
           activo,
         })
       );

       await editarLayout({
         tipo: "FAQ",
         faq: updatedFaqData,
       });

       toast.success("FAQ actualizado com sucesso!!");
     } catch (error) {
       console.error("Upps.... Algo correu mal", error);
       toast.error("Falha ao actualizar o FAQ. Tente novamente!");
     }
   } else {
     toast.error("Tens de editar ou Adicionar um novo FAQ antes de Guardar..!!!");
   }
 };
  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
      <div className="mt-12">
        <dl className="space-y-8">
          {perguntas.map((q) => (
            <div
              key={q._id}
              className={`${
                q._id !== perguntas[0]?._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => togglePerguntas(q._id)}
                >
                  <input
                    className={`${styles.input} border-none`}
                    value={q.pergunta}
                    onChange={(e) => handleMudarPergunta(q._id, e.target.value)}
                    placeholder="Adicionar Pergunta..."
                  />
                  <span className="ml-6 flex-shrink-0">
                    {q.activo ? (
                      <HiMinus className="h-6 w-6 dark:text-white text-black" />
                    ) : (
                      <HiPlus className="h-6 w-6 dark:text-white text-black" />
                    )}
                  </span>
                </button>
              </dt>
              {q.activo && (
                <dd>
                  <input
                    className={`${styles.input} border-none`}
                    value={q.resposta}
                    onChange={(e) => handleMudarResposta(q._id, e.target.value)}
                    placeholder="Adicionar Resposta..."
                  />
                  <span className="ml-6 flex-shrink-0">
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setPerguntas((perguntas) =>
                          perguntas.filter((item) => item._id !== q._id)
                        );
                      }}
                    />
                  </span>
                </dd>
              )}
            </div>
          ))}
        </dl>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <IoMdAddCircle
          className="w-8 h-8 flex items-center justify-center text-center dark:text-white text-black text-[18px] cursor-pointer"
          onClick={novoFaqHandler}
        />

        <div
          className={`w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer`}
          onClick={handleEditar}
        >
          Guardar
        </div>
      </div>
    </div>
  );
};

export default EditarFaq;
