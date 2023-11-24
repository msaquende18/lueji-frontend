import { redirect } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';


interface ProtectedProps {
    children: React.ReactNode;
}

export default function AdminProtected({ children}: ProtectedProps){
    const { usuario } = useSelector((state: any) => state.auth);

    if(usuario){
        const isAdmin = usuario?.funcao === "admin";
        return isAdmin ? children : redirect("/");
    }
}