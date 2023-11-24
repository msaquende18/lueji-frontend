"use client";
import React from "react";
import AdminDashboardSidebar from "../../dashboard/AdminDashboardSidebar";
import Heading from "../../../utils/Heading";
import DashboardHeader from "../../dashboard/DashboardHeader";
import EditarCurso from "./EditarCurso";

type Props = {};

const Page = ({params}:any) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        titulo="Lueji - Admin Panel"
        descricao="Lueji é uma plataforma para estudantes para aprender e receber ajuda de formadores"
        palavrasChaves="Marketing Digital, Emprendedorismo, Programação"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminDashboardSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditarCurso id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
