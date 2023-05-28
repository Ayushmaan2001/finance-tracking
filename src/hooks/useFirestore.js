import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timeStamp } from "../firebase/config";

let intiState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOC":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERR":
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "DELETED_DOC":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    default:
      return { state };
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, intiState);
  const [isCancelled, setisCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  //only dispatch if not cancelled
  const dispatchCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timeStamp.fromDate(new Date());
      const added = await ref.add({ ...doc, createdAt });
      dispatchCancelled({ type: "ADDED_DOC", payload: added });
    } catch (error) {
      dispatchCancelled({ type: "ERR", payload: error.message });
    }
  };

  //delete
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await ref.doc(id).delete();
      dispatch({ type: "DELETED_DOC"});
    } catch (error) {
      dispatch({ type: "ERR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => {
      setisCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
