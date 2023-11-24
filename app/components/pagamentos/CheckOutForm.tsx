import React,{useState, useEffect} from 'react'
import {LinkAuthenticationElement, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useCriarPedidoMutation } from "../../../redux/features/pedidos/pedidosApi";
import { useCarregarUsuarioQuery } from "../../../redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import { toast } from 'react-hot-toast';
import { styles } from "../../styles/style";


type Props = {
  setOpen:any;
  data: any;
};

const CheckOutForm = ({ setOpen ,data}: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>("");
    const [criarPedido, {data:dadosDoPedido,error}] = useCriarPedidoMutation();
    const [carregarUsuario, setCarregarUsuario] = useState(false);
    const {} = useCarregarUsuarioQuery({skip:carregarUsuario ? false : true});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(!stripe || !elements){
          return;
        }
        setIsLoading(true);
        const {error, paymentIntent} = await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });
        if(error){
          setMessage(error.message);
          setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          setIsLoading(false);
          criarPedido({ cursoId: data._id, pagamento_info: paymentIntent });
        }
    };

    useEffect(() => {
      if (dadosDoPedido) {
        setCarregarUsuario(true);
        redirect(`/curso-acesso/${data._id}`);
      }
      if (error) {
        if ("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data.message);
        }
      }
    }, [criarPedido, error, dadosDoPedido, data._id]);
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text" className={`${styles.button} mt-2 `}>
            {isLoading ? "A pagar..." : "Pagar"}
          </span>
            
        </button>
        {/* Mostrar mensagem de erro ou de sucesso */}
        {message && (
            <div id="payment-message" className="text-[crimson] font-Poppins pt-2">
                {message}
            </div>
        )

        }
    </form>
  );
};

export default CheckOutForm