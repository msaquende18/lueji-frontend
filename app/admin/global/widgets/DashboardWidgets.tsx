import React, { FC, useState, useEffect } from "react";
import UsuariosAnalytics from "../../Analytics/UsuariosAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import PedidosAnalytics from "../../Analytics/PedidosAnalytics";
import Transacao from "../../facturas/Transacao";
import Loader from "../../../components/Loader/Loader";

import { useVerUsuariosAnaliticsQuery } from "../../../../redux/features/analytics/analyticsApi";

import { useVerPedidosAnaliticsQuery } from "../../../../redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [comparaPercentagemDasVendas, setComparaPercentagemDasVendas] =
    useState<any>();
  const [comparaPercentagemDoUsuario, setComparaPercentagemDoUsuario] =
    useState<any>();

  const { data, isLoading } = useVerUsuariosAnaliticsQuery({});

  const { data: dadosDoPedido, isLoading: pedidosLoading } =
    useVerPedidosAnaliticsQuery({});

  useEffect(() => {
    if (isLoading && pedidosLoading) {
      return;
    } else {
      if (data && dadosDoPedido) {
        const usuariosNosDoisUltimosMeses =
          data.usuarios.ultimos12Meses.slice(-2);
        const vendasNosDoisUltimosMeses =
          dadosDoPedido.pedidos.ultimos12Meses.slice(-2);

        if (
          usuariosNosDoisUltimosMeses.length === 2 &&
          vendasNosDoisUltimosMeses.length === 2
        ) {
          const usuariosDoMesCorrente = usuariosNosDoisUltimosMeses[1].count;
          const usuariosDoMesPassado = usuariosNosDoisUltimosMeses[0].count;

          const vendasDoMesCorrente = vendasNosDoisUltimosMeses[1].count;
          const vendasDoMesPassado = vendasNosDoisUltimosMeses[0].count;

          const usuariosPercentagemCalculada =
            usuariosDoMesPassado !== 0 ? (
              (usuariosDoMesCorrente - usuariosDoMesPassado) /
                usuariosDoMesPassado
            ) * 100 : 100;
          const vendasPercentagemCalculada =
            vendasDoMesPassado !== 0 ? ( 
              (vendasDoMesCorrente - vendasDoMesPassado) / vendasDoMesPassado
            ) * 100 : 100;

          setComparaPercentagemDoUsuario({
            mesCorrente: usuariosDoMesCorrente,
            mesPassado: usuariosDoMesPassado,
            percentagemCalculada: usuariosPercentagemCalculada,
          });
          setComparaPercentagemDasVendas({
            mesCorrente: vendasDoMesCorrente,
            mesPassado: vendasDoMesPassado,
            percentagemCalculada: vendasPercentagemCalculada,
          });
        }
      }
    }
  }, [isLoading, pedidosLoading, data, dadosDoPedido]);

  return (
    <>
      <div className="mt-[30px] min-h-screen">
        <div className="grid grid-cols-[75%,25%]">
          <div className="p-8">
            <UsuariosAnalytics isDashboard={true} />
          </div>

          <div className="pt-[80px] pr-8">
            <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
              <div className="flex items-center p-5 justify-between">
                <div className="">
                  <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                  <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                    {comparaPercentagemDasVendas?.mesCorrente}
                  </h5>
                  <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400]">
                    Vendas Feitas
                  </h5>
                </div>
                <div>
                  <CircularProgressWithLabel
                    value={
                      comparaPercentagemDasVendas?.percentagemCalculada > 0
                        ? 100
                        : 0
                    }
                    open={open}
                  />
                  <h5 className="text-center pt-4 dark:text-[#fff] text-black">
                    {comparaPercentagemDasVendas?.percentagemCalculada > 0
                      ? "+" +
                        comparaPercentagemDasVendas?.percentagemCalculada.toFixed(
                          2
                        )
                      : "-" +
                        comparaPercentagemDasVendas?.percentagemCalculada.toFixed(
                          2
                        )}{" "}
                    %
                  </h5>
                </div>
              </div>
            </div>

            <div className="w-full dark:bg-[#111C43] rounded-sm shadow mt-4">
              <div className="flex items-center p-5 justify-between">
                <div className="">
                  <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                  <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                    {comparaPercentagemDoUsuario?.mesCorrente}
                  </h5>
                  <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400]">
                    Novos Usuários
                  </h5>
                </div>
                <div>
                  <CircularProgressWithLabel
                    value={
                      comparaPercentagemDoUsuario?.percentagemCalculada > 0
                        ? 100
                        : 0
                    }
                    open={open}
                  />
                  <h5 className="text-center pt-4 dark:text-[#fff] text-black">
                    {comparaPercentagemDoUsuario?.percentagemCalculada > 0
                      ? "+" +
                        comparaPercentagemDoUsuario?.percentagemCalculada.toFixed(
                          2
                        )
                      : "-" +
                        comparaPercentagemDoUsuario?.percentagemCalculada.toFixed(
                          2
                        )}{" "}
                    %
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[65%,35%] mt-[-20px]">
          <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
            <PedidosAnalytics isDashboard={true} />
          </div>
          <div className="p-5">
            <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400] pb-3">
              Transações Recentes
            </h5>
            <Transacao isDashboard={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardWidgets;
