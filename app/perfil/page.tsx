/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, {FC, useState} from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading';
import Header from '../components/home/header/Header';
import Perfil from './Perfil';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';

type Props = {}

const Page: FC<Props> = (props) => {

  const [open, setOpen] = useState(false);
  const [activarItem, setActivarItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const {usuario} = useSelector((state:any) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          titulo={`${usuario?.nome} perfil`}
          descricao="MS Academy é uma plataforma para estudantes para aprender e receber ajuda de formadores"
          palavrasChaves="Marketing Digital, Emprendedorismo, Programação"
        />

        <Header
          open={open}
          setOpen={setOpen}
          activarItem={activarItem}
          setRoute={setRoute}
          route={route}
        />
        <Perfil usuario={usuario} />
        <Footer />
      </Protected>
    </div>
  );
}

export default Page