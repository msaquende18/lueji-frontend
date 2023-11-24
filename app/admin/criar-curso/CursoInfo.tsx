import React, { FC, useState, useEffect } from "react";
import { styles } from "../../styles/style";
import {
  useVerDadosLayoutQuery,
} from "../../../redux/features/layout/layoutApi";


type Props = {
  cursoInfo: any;
  setCursoInfo: (cursoInfo: any) => void;
  activo: number;
  setActivo: (activo: number) => void;
};

const CursoInfo: FC<Props> = ({
  cursoInfo,
  setCursoInfo,
  activo,
  setActivo,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useVerDadosLayoutQuery("Categorias", {});
  const [categorias, setCategorias] = useState([]);

useEffect(() => {
  setCategorias(data?.layout?.categorias);
  },[data]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActivo(activo + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCursoInfo({ ...cursoInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCursoInfo({ ...cursoInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Nome do Curso</label>
          <input
            type="name"
            name=""
            required
            value={cursoInfo.nome}
            onChange={(e: any) =>
              setCursoInfo({ ...cursoInfo, nome: e.target.value })
            }
            id="nome"
            placeholder=""
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Descrição do Curso</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Escreva a descrição do curso..."
            className={`${styles.input} !h-min !py-2`}
            value={cursoInfo.descricao}
            onChange={(e: any) =>
              setCursoInfo({ ...cursoInfo, descricao: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Preço (opcional)</label>
            <input
              type="number"
              name=""
              value={cursoInfo.preco}
              onChange={(e: any) =>
                setCursoInfo({ ...cursoInfo, preco: e.target.value })
              }
              id="preco"
              placeholder="500"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Estimativa do preço (opcional)
            </label>
            <input
              type="number"
              name=""
              value={cursoInfo.precoEstimado}
              onChange={(e: any) =>
                setCursoInfo({ ...cursoInfo, precoEstimado: e.target.value })
              }
              id="precoEstimado"
              placeholder="300"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div className="w-full flex justify-between mt-2">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Tags
            </label>
            <input
              type="text"
              name=""
              required
              value={cursoInfo.tags}
              onChange={(e: any) =>
                setCursoInfo({ ...cursoInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="marketing,digital,gestao,visao"
              className={`${styles.input}`}
            />
            
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Categoria do Curso
            </label>
            {categorias && categorias.length > 0 && (
              <select
                name=""
                id=""
                className={`${styles.input}`}
                value={cursoInfo.categorias}
                onChange={(e: any) =>
                  setCursoInfo({ ...cursoInfo, categorias: e.target.value })
                }
              >
                <option value="">Seleciona a categoria</option>
                {categorias.map((item: any) => (
                  <option value={item.titulo} key={item._id}>
                    {item.titulo}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        {/* <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name=""
              required
              value={cursoInfo.demoUrl}
              onChange={(e: any) =>
                setCursoInfo({ ...cursoInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div> */}
        <br />

        <div className="w-full flex justify-between mt-2">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Nível do Curso</label>
            <input
              type="text"
              name=""
              required
              value={cursoInfo.nivel}
              onChange={(e: any) =>
                setCursoInfo({ ...cursoInfo, nivel: e.target.value })
              }
              id="nivel"
              placeholder="Iniciante/Intermédio/Avançado"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name=""
              required
              value={cursoInfo.demoUrl}
              onChange={(e: any) =>
                setCursoInfo({ ...cursoInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full cursor-pointer">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[18vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {cursoInfo.thumbnail ? (
              <img
                src={cursoInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="cursor-pointer">
                Arrasta e Solta o teu thumbnail aqui ou Clica Aqui para fazer o
                Upload
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Próximo"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CursoInfo;
