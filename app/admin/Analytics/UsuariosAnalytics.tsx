import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Loader from "../../components/Loader/Loader";
import { useVerUsuariosAnaliticsQuery } from "../../../redux/features/analytics/analyticsApi";
import { styles } from "../../styles/style";

type Props = {
  isDashboard?: boolean;
};

  // const analyticsData = [
  //   { nome: "Janeiro 2023", count: 800 },
  //   { nome: "Fevereiro 2023", count: 1900 },
  //   { nome: "Março 2023", count: 7000 },
  //   { nome: "Abril 2023", count: 8000 },
  //   { nome: "Maio 2023", count: 9700 },
  //   { nome: "Junho 2023", count: 1900 },
  //   { nome: "Julho 2023", count: 7000 },
  //   { nome: "Agosto 2023", count: 8000 },
  //   { nome: "Setembro 2023", count: 1860 },
  //   { nome: "Octubro 2023", count: 5900 },
  //   { nome: "Novembro 2023", count: 9890 },
  //   { nome: "Dezembro 2023", count: 10860 },
  // ];


const UsuariosAnalytics = ({isDashboard}: Props) => {
  const { data, isLoading } = useVerUsuariosAnaliticsQuery({});


  let analyticsData: any[] = [];

  if (data?.usuarios?.ultimos12Meses) {
    analyticsData = data.usuarios.ultimos12Meses.map((item: any) => ({
      nome: item.mes,
      usuarios: item.count,
    }));
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${!isDashboard ? "mt-[50px]" : ""}`}>
            <h1
              className={`${styles.titulo} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Usuários --- Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Dados da analíse dos Últimos 12 Meses{""}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="nome" />

                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UsuariosAnalytics;
