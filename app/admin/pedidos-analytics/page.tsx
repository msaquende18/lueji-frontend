"use client";
import React from "react";
import Heading from "../../utils/Heading";
import AdminDashboardSidebar from "../dashboard/AdminDashboardSidebar";
import AdminProtected from "../../hooks/adminProtected";
import DashboardHero from "../dashboard/DashboardHero";
import PedidosAnalytics from "../Analytics/PedidosAnalytics";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          titulo="Lueji - Admin Panel"
          descricao="Lueji é uma plataforma para estudantes para aprender e receber ajuda de formadores"
          palavrasChaves="Marketing Digital, Emprendedorismo, Programação"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%]  w-1/5">
            <AdminDashboardSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <PedidosAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
