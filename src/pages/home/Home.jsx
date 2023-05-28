import styles from "./Home.module.css";
import Transaction from "./Transaction";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import TransactionList from "./TransactionList";

function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList docs={documents} />}
      </div>
      <div className={styles.sidebar}>
        <Transaction uid={user.uid} />
      </div>
    </div>
  );
}

export default Home;
