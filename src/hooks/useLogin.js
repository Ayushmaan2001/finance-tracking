import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [isCancelled, setisCancelled] = useState(false);
  const [error, seterror] = useState(null);
  const [isPending, setisPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email,password) => {
    seterror(null);
    setisPending(true);

    //sign user out
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email,password);

      //dispatch login action
      dispatch({ type: "LOGIN" , payload:res.user});

      //update state
      if (!isCancelled) {
        setisPending(false);
        seterror(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error);
        seterror(error);
        setisPending(false);
      }
    }
  };

  //   useEffect(() => {
  //     return () => {
  //       setisCancelled(true);
  //     };
  //   }, []);

  return { login, error, isPending };
}
