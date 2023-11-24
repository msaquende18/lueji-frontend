import React from 'react';
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList,
} from "recharts";

import Loader from "../../components/Loader/Loader";
import {useVerCursosAnaliticsQuery} from "../../../redux/features/analytics/analyticsApi"
import {styles} from '../../styles/style';


type Props = {}

const CursosAnalytics = (props: Props) => {
  const { data, isLoading } = useVerCursosAnaliticsQuery({});

//   const analyticsData = [
//     { nome: "Maio 2023", uv: 3 },
//     { nome: "Junho 2023", uv: 9 },
//     { nome: "Julho 2023", uv: 7 },
//     { nome: "Agosto 2023", uv: 8 },
//     { nome: "Setembro 2023", uv: 6 },
//     { nome: "Octubro 2023", uv: 5 },
//     { nome: "Novembro 2023", uv: 8 },
//   ];

  const analyticsData: any[] = [];

  if (data?.cursos?.ultimos12Meses) {
    data.cursos.ultimos12Meses.forEach((item: any) => {
      analyticsData.push({ nome: item.mes, uv: item.count });
    });
  }


  const minValue = 0;

  return (
    <>
    {
        isLoading ? (
            <Loader />
        ) : (
            <div className="h-screen">
             <div className="mt-[50px]">
              <h1 className={`${styles.titulo} px-5 !text-start`}>
               Cursos --- Analytics  
              </h1> 
              <p className={`${styles.label} px-5`}>
               Dados da analíse dos Últimos 12 Meses{""}  
              </p>   
            </div>
            <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
                <BarChart width={150} height={300} data={analyticsData}>
                   <XAxis dataKey="nome">
                <Label offset={0} position="insideBottom"/>
                  </XAxis> 
                  <YAxis domain={[minValue, "auto"]} />
                  <Bar dataKey="uv" fill="#3faf82">
                    <LabelList dataKey="uv" position="top" />
                  </Bar>
                </BarChart>
            </ResponsiveContainer>
            </div>   
            </div>
        )
    }
    </>
  )
}

export default CursosAnalytics