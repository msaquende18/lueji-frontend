import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

import Loader from "../../components/Loader/Loader";
import { useVerPedidosAnaliticsQuery } from "../../../redux/features/analytics/analyticsApi";
import { styles } from "../../styles/style";

type Props = {
  isDashboard?: boolean;
};

// const analyticsData = [
//   {
//     nome: "Pág. A",
//     numero: "1000",
//   },
//   {
//     nome: "Pág. B",
//     numero: "300",
//   },
//   {
//     nome: "Pág. C",
//     numero: "700",
//   },
//   {
//     nome: "Pág. D",
//     numero: "900",
//   },
//   {
//     nome: "Pág. E",
//     numero: "1000",
//   },
//   {
//     nome: "Pág. F",
//     numero: "1500",
//   },
//   {
//     nome: "Pág. G",
//     numero: "1800",
//   },
// ];

const PedidosAnalytics = ({isDashboard}: Props) => {
     const { data, isLoading } = useVerPedidosAnaliticsQuery({});
  
     
     const analyticsData: any[] = [];

     if (data?.pedidos?.ultimos12Meses) {
       data.pedidos.ultimos12Meses.forEach((item: any) => {
         analyticsData.push({ nome: item.nome, pedidos: item.count });
       });
     }



  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`${styles.titulo} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Pedidos --- Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Dados da analíse dos Últimos 12 Meses{""}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />

                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="pedidos" stroke="#4d62d9" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default PedidosAnalytics;
