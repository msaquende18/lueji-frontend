import { useSelector } from "react-redux";


export default function useAuth(){
    const { usuario } = useSelector((state: any) => state.auth);

    if(usuario){
        return true;
    }
    else{
        return false;
    }
}