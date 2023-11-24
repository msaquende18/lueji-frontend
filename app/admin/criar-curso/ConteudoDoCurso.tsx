import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { styles } from "../../styles/style";
import { toast } from "react-hot-toast";

type Props = {
  conteudoDoCurso: any;
  setConteudoDoCurso: (conteudoDoCurso: any) => void;
  activo: number;
  setActivo: (activo: number) => void;
  handleSubmit: any;
};

const ConteudoDoCurso: FC<Props> = ({
  conteudoDoCurso,
  setConteudoDoCurso,
  activo,
  setActivo,
  handleSubmit: handleCursoSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(conteudoDoCurso.length).fill(false)
  );

  const [seccaoActiva, setSeccaoActiva] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleColapsedToggle = (index: number) => {
    const actualizarCollapsed = [...isCollapsed];
    actualizarCollapsed[index] = !actualizarCollapsed[index];
    setIsCollapsed(actualizarCollapsed);
  };

  const handleRemoverLink = (index: number, linkIndex: number) => {
    const actualizarDados = [...conteudoDoCurso];
    actualizarDados[index].links.splice(linkIndex, 1);
    setConteudoDoCurso(actualizarDados);
  };

  const handleAddLink = (index: number) => {
    const actualizarDados = [...conteudoDoCurso];
    actualizarDados[index].links.push({ titulo: "", url: "" });
    setConteudoDoCurso(actualizarDados);
  };

  const novoConteudoHandler = (item: any) => {
    if (
      item.titulo === "" ||
      item.descricao === "" ||
      item.videoUrl === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Preencha todos os campos!");
    } else {
      let novaSeccaoDoVideo = "";

      if (conteudoDoCurso.length > 0) {
        const ultimaSeccaoDoVideo =
          conteudoDoCurso[conteudoDoCurso.length - 1].videoSection;

        // Usar a última secção se tiver disponível

        if (ultimaSeccaoDoVideo) {
          novaSeccaoDoVideo = ultimaSeccaoDoVideo;
        }
      }
      const novoConteudo = {
        videoUrl: "",
        titulo: "",
        descricao: "",
        videoSection: novaSeccaoDoVideo,
        links: [{ titulo: "", url: "" }],
      };

      setConteudoDoCurso([...conteudoDoCurso, novoConteudo]);
    }
  };

  const addNovaSeccao = () => {
    const lastSection = conteudoDoCurso[conteudoDoCurso.length - 1];
    if (
      lastSection.titulo === "" ||
      lastSection.descricao === "" ||
      lastSection.videoUrl === "" ||
      lastSection.links[0].titulo === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Preencha todos os campos!");
    } else {
      
      const novaSeccao = {
        videoUrl: "",
        titulo: "",
        descricao: "",
        videoSection: "",
        links: [{ titulo: "", url: "" }],
      };
      setConteudoDoCurso([...conteudoDoCurso, novaSeccao]);
    }
  };

  const botaoVoltar = () => {
    setActivo(activo - 1);
  };
  const handleOptions = () => {
   
    const lastSection = conteudoDoCurso[conteudoDoCurso.length - 1];
    if (
      lastSection.titulo === "" ||
      lastSection.descricao === "" ||
      lastSection.videoUrl === "" ||
      lastSection.links[0].titulo === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Preencha todos os campos!");
    } else{
      setActivo(activo + 1);
      handleCursoSubmit();
    }
  };


  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {conteudoDoCurso?.map((item: any, index: number) => {
          const mostrarSeccaoInput =
            index === 0 ||
            item.videoSection !== conteudoDoCurso[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  mostrarSeccaoInput ? "mt-10" : "mb-0"
                }`}
              >
                {mostrarSeccaoInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        placeholder="Nome da secção"
                        onChange={(e) => {
                          const actualizarDados = [...conteudoDoCurso];
                          actualizarDados[index].videoSection = e.target.value;
                          setConteudoDoCurso(actualizarDados);
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}

                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.titulo ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.titulo}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* Cetas */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const actualizarDados = [...conteudoDoCurso];
                          actualizarDados.splice(index, 1);
                          setConteudoDoCurso(actualizarDados);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleColapsedToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}> Título do Vídeo</label>
                      <input
                        type="text"
                        placeholder="Projecto.."
                        className={`${styles.input}`}
                        value={item.titulo}
                        onChange={(e) => {
                          const actualizarDados = [...conteudoDoCurso];
                          actualizarDados[index].titulo = e.target.value;
                          setConteudoDoCurso(actualizarDados);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Vídeo Url</label>
                      <input
                        type="text"
                        placeholder="hjtrj"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const actualizarDados = [...conteudoDoCurso];
                          actualizarDados[index].videoUrl = e.target.value;
                          setConteudoDoCurso(actualizarDados);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Duração do Vídeo (Em minutos)</label>
                      <input
                        type="number"
                        placeholder="3 minutos"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const actualizarDados = [...conteudoDoCurso];
                          actualizarDados[index].videoLength = e.target.value;
                          setConteudoDoCurso(actualizarDados);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Descrição do vídeo</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="Descrição do vídeo"
                        className={`${styles.input} !h-min py-2`}
                        value={item.descricao}
                        onChange={(e) => {
                          const actualizarDados = [...conteudoDoCurso];
                          actualizarDados[index].descricao = e.target.value;
                          setConteudoDoCurso(actualizarDados);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`dark:text-white text-[20px] text-black ${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } `}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoverLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Título do Link.."
                          className={`${styles.input}`}
                          value={link.titulo}
                          onChange={(e) => {
                            const actualizarDados = [...conteudoDoCurso];
                            actualizarDados[index].links[linkIndex].titulo =
                              e.target.value;
                            setConteudoDoCurso(actualizarDados);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Link do material.."
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const actualizarDados = [...conteudoDoCurso];
                            actualizarDados[index].links[linkIndex].url =
                              e.target.value;
                            setConteudoDoCurso(actualizarDados);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* Botão Adicionar Link */}

                    <div className="inline-block mb-4">
                      <p
                        className="flex items-centter text-[18px] dark:text-white text-black  cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* Adicionar novo conteúdo */}
                {index === conteudoDoCurso.length - 1 && (
                  <div>
                    <p
                      className="flex items-centter text-[18px] dark:text-white text-black  cursor-pointer"
                      onClick={(e: any) => novoConteudoHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Adicionar
                      Conteúdo
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
          onClick={() => addNovaSeccao()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Adicionar Secção
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => botaoVoltar()}
        >
          voltar
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Próximo
        </div>
      </div>
    </div>
  );
};

export default ConteudoDoCurso;
