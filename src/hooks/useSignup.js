import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setisCancelled] = useState(false);
  const [error, seterror] = useState(null);
  const [isPending, setisPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    seterror(null);
    setisPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // add display name to user
      await res.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setisPending(false);
        seterror(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        seterror(error.message);
        setisPending(false);
      }
    }
  };

  useEffect(() => {
    console.log(dispatch);
    // return () => {
    //     setisCancelled(true);
    // };
  });

  return { error, isPending, signup };
};
