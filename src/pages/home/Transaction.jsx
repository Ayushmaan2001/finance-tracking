import { useState,useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";


const Transaction = ({uid}) => {
  const [name, setname] = useState("");
  const [amount, setamount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ uid,name, amount });
  };

  useEffect(() => {
      if(response.success){
          setname('');
          setamount('');
      }
  }, [response.success]);
  return (
    <>
      <h3>Add a transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>transation name:</span>
          <input
            type="text"
            required
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount:</span>
          <input
            type="number"
            required
            onChange={(e) => setamount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
};

export default Transaction;
