import styles from "./Home.module.css";
import {useFirestore} from '../../hooks/useFirestore';

function TransactionList({ docs }) {
  const {deleteDocument,response} = useFirestore('transactions')
  // console.log(response);

  return (
    <ul className={styles.transactions}>
      {docs.map((transactions) => {
        return (
          <li key={transactions.id}>
            <p className={styles.name}>{transactions.name}</p>
            <p className={styles.amount}>${transactions.amount}</p>
            <button onClick={() => deleteDocument(transactions.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}

export default TransactionList;
