'use client'
import React, {FC, useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from 'react-icons/fc';
import { styles } from '../../../styles/style';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-hot-toast';

import {signIn} from 'next-auth/react';



type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string().email("Email Inválido!").required("Digite o seu email"),
  palavraPasse: Yup.string().required("Digite a palavra passe").min(6),
});


const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [mostrar, setMostrar] = useState(false);

  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", palavraPasse: "" },
    validationSchema: schema,
    onSubmit: async (email, palavraPasse) => {
      await login({ email: values.email, palavraPasse: values.palavraPasse });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Bem vindo novamente!!!");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, setOpen]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="">
      <h1 className={`${styles.titulo}`}>Login</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="exemplo@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Palavra passe
          </label>
          <input
            type={!mostrar ? "password" : "text"}
            name="palavraPasse"
            value={values.palavraPasse}
            onChange={handleChange}
            id="palavraPasse"
            placeholder="Palavra Passe"
            className={`${
              errors.palavraPasse && touched.palavraPasse && "border-red-500"
            } ${styles.input}`}
          />
          {!mostrar ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 text-black dark:text-white cursor-pointer"
              size={20}
              onClick={() => setMostrar(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 text-black dark:text-white cursor-pointer"
              size={20}
              onClick={() => setMostrar(false)}
            />
          )}
        </div>
        {errors.palavraPasse && touched.palavraPasse && (
          <span className="text-red-500 pt-2 block">{errors.palavraPasse}</span>
        )}
        <div className="flex items-center justify-center my-3 mt-5 ">
          <input type="submit" value="Entrar" className={`${styles.button} `} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Ou entrar com
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Não tens conta?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Registar")}
          >
            fazer registo
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login