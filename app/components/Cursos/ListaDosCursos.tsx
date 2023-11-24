import React, { FC, useState } from "react";
import {BsChevronUp, BsChevronDown} from 'react-icons/bs';
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  videoActivo?: number;
  setVideoActivo?: any;
  isDemo?: boolean;
};

const ListaDosCursos: FC<Props> = (props) => {
  const [seccaoVisiveis, setSeccaoVisiveis] = useState<Set<string>>(new Set<string>());

  const videoSections: string[] = [];

  if (props.data) {
    props.data.forEach((item: any) => {
      if (!videoSections.includes(item.videoSection)) {
        videoSections.push(item.videoSection);
      }
    });
  }

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const novaSeccaoVisivel = new Set(seccaoVisiveis);
    if(novaSeccaoVisivel.has(section)){
        novaSeccaoVisivel.delete(section);
    } else {
        novaSeccaoVisivel.add(section);
    }
    setSeccaoVisiveis(novaSeccaoVisivel);
  };
 
 
  return (
    <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] sticky top-24 left-0 z-30'}`}>
        {videoSections.map((section: string, sectionIndex: number) => {
            const isSectionVisivel = seccaoVisiveis.has(section);

            // Filtrar os videos por seccao

            const seccaoDosVideos: any[] = props.data.filter(
                (item: any) => item.videoSection === section
            );
            const sectionVideoCount: number = seccaoDosVideos.length;
            const sectionVideoLength: number = seccaoDosVideos.reduce(
                (tamanhoTotal: number, item: any) => tamanhoTotal + item.videoLength, 0
            );

            const sectionStartIndex: number = totalCount;
            totalCount += sectionVideoCount;

            const sectionContentHours: number = sectionVideoLength / 60;
            return (
              <div
                className={`${
                  !props.isDemo && "border-b border-[#ffffff8e] pb-2"
                }`}
                key={section}
              >
                <div className="w-full flex">
                  {/* Video Section Compon ent */}
                  <div className="w-full flex justify-between items-center">
                    <h2 className="text-[22px] text-black dark:text-white">
                      {section}
                    </h2>
                    <button
                      className="mr-4 cursor-pointer text-black dark:text-white"
                      onClick={() => toggleSection(section)}
                    >
                      {isSectionVisivel ? (
                        <BsChevronUp
                          size={20}
                          className="mr-4 cursor-pointer text-black dark:text-white"
                        />
                      ) : (
                        <BsChevronDown
                          size={20}
                          className="mr-4 cursor-pointer text-black dark:text-white"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <h5 className="text-black dark:text-white">
                  {sectionVideoCount} Aula(s){" "}
                  {sectionVideoLength < 60
                    ? sectionVideoLength
                    : sectionContentHours.toFixed(2)}{" "}
                  {sectionVideoLength > 60 ? "horas" : "minutos"}
                </h5>
                <br />
                {isSectionVisivel && (
                  <div className="w-full">
                    {seccaoDosVideos.map((item: any, index: number) => {
                      const videoIndex: number = sectionStartIndex + index;
                      const contentLength: number = item.videoLength / 60;
                      return (
                        <div
                          className={`w-full ${
                            videoIndex === props.videoActivo
                              ? "dark:bg-slate-800 bg-[#9dc4c6]"
                              : "bg-transparent"
                          } cursor-pointer transition-all p-2`}
                          key={item._id}
                          onClick={() =>
                            props.isDemo
                              ? null
                              : props?.setVideoActivo(videoIndex)
                          }
                        >
                          <div className="flex items-start">
                            <div>
                              <MdOutlineOndemandVideo
                                size={25}
                                className="mr-2"
                                color="#1cdada"
                              />
                            </div>
                            <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                              {item.titulo}
                            </h1>
                          </div>
                          <h5 className="pl-8 text-black dark:text-white">
                            {item.videoLength > 60
                              ? contentLength.toFixed(2)
                              : item.videoLength}{" "}
                            {item.videoLength > 60 ? "horas" : "minutos"}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                )}
                
              </div>
            );
})}
    </div>
  );
  
};

export default ListaDosCursos;
