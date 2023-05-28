import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    // console.log(context)
    // console.log(context)

    if(!context){
        throw Error('useAuthContext must be inside an AuthContextProvider');
    }
    return context;
}