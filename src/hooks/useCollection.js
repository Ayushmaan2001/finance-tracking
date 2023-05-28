import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { useRef } from "react";

export const useCollection = (collection, _query,_orderBy) => {
  const [documents, setdocuments] = useState(null);
  const [error, setError] = useState(null);

  //if we dont user a ref --> infinte loop in useEffect
  //_query is an array different on every function call

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if(orderBy){
      ref=ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        //update state
        setdocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );

    //unsub on unmount
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
