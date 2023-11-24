'use client'

import React, {FC, useState} from "react";
import Heading from "./utils/Heading";
import Header from './components/home/header/Header'
import Hero from "./components/home/hero-section/Hero";
import Cursos from "./components/Route/Cursos";
import Reviews from "./components/Route/Reviews";
import Footer from "./components/Footer/Footer";

interface Props {}



const Page: FC<Props> = (props) => {
   const [open, setOpen] = useState(false);
   const [activarItem, setActivarItem] = useState(0);
   const [route, setRoute] = useState("Login");

   return (
     <div>
       <Heading
         titulo="Lueji"
         descricao="Lueji é uma plataforma para estudantes para aprender e receber ajuda de formadores"
         palavrasChaves="Marketing Digital, Emprendedorismo, Programação"
       />

       <Header
         open={open}
         setOpen={setOpen}
         activarItem={activarItem}
         setRoute={setRoute}
         route={route}
       />

       <Hero />
       <Cursos  />
       <Reviews />
       <Footer />
     </div>
   );
};



export default Page;