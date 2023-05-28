import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const [isCancelled, setisCancelled] = useState(false);
  const [error, seterror] = useState(null);
  const [isPending, setisPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    seterror(null);
    setisPending(true);

    //sign user out
    try {
      await projectAuth.signOut();

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

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

  return { logout, error, isPending };
}
