import React,{useState, useEffect} from 'react';
import {useVerCursosQuery} from '../../../redux/features/cursos/cursosApi';
import CursoCard from '../Cursos/CursoCard'


type Props = {}

const Cursos = (props: Props) => {
    const {data,isLoading} = useVerCursosQuery({});
    const [cursos, setCursos] = useState<any[]>([]);

    useEffect(() => {
      setCursos(data?.cursos);
    }, [data, isLoading]);

    console.log(data);
  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="dark:text-white mt-10 text-[#000000c7] text-[20px]  w-full 1000px:text-[50px] font-[400] font-Josefin 1000px:leading-[65px] 1500px:w-[50%]">
          Dê um salto na tua{" "}
          <span className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            carreira
          </span>{" "}
          <br />
          com os nossos cursos
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0">
          {cursos &&
            cursos.map((item: any, index: number) => (
              <>
                <CursoCard item={item} key={index} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Cursos