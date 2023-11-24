import React, { useState,useEffect  } from "react";
import {useVerDetalhesDoCursoQuery} from "../../../redux/features/cursos/cursosApi";
import Heading from "../../utils/Heading";
import Loader from "../Loader/Loader";
import Header from "../home/header/Header";
import Footer from "../Footer/Footer";
import InfoCurso from "./InfoCurso";
import {
  useGetStripePublishablekeyQuery,
  useCreatePaymentIntentMutation,
} from "../../../redux/features/pedidos/pedidosApi";

import {loadStripe} from "@stripe/stripe-js";

type Props = {
    id:string;
}

const CursoDetalhes = ({id}: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const {data: config} = useGetStripePublishablekeyQuery({});
    const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation();
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientScret] = useState('');
    const { data, isLoading } = useVerDetalhesDoCursoQuery(id);

useEffect(() => {
  if (config) {
    const publishablekey = config?.publishableKey;
    setStripePromise(loadStripe(publishablekey));
  }
  if (data) {
    const amount = Math.round(data.curso.preco * 100);
    createPaymentIntent(amount);
  }
}, [config, data]);

useEffect(() => {
  if (paymentIntentData) {
    setClientScret(paymentIntentData?.client_secret);
   // setClientScret(paymentIntentData?.clientSecret);
  }
}, [paymentIntentData]);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            titulo={data?.curso?.nome + "- Academia Lueji"}
            descricao={
              "Lueji é uma plataforma para estudantes para aprender e receber ajuda de formadores"
            }
            palavrasChaves={data?.curso?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activarItem={1}
            setRoute={setRoute}
            route={route}
          />
          {stripePromise && (
            <InfoCurso
              data={data?.curso}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
             
              setOpen={setOpen}
              
              setRoute={setRoute}
              
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
}

export default CursoDetalhes