"use client";
import React from "react";
import AdminDashboardSidebar from "../../dashboard/AdminDashboardSidebar";
import Heading from "../../../utils/Heading";
import DashboardHeader from "../../dashboard/DashboardHeader";

type Props = {};

const Page = () => {
 

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
          
        </div>
      </div>
    </div>
  );
};

export default Page;
