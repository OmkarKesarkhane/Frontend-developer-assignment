import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderForm from "../OrderForm/OrderForm";
import styles from "./PreviousOrders.module.scss";
import Search from "../Search/Search";

function PreviousOrders() {
  const [orders, setOrders] = useState();

  const history = useHistory();

  const getData = () => {
    let totalOrders = JSON.parse(localStorage.getItem("Orders"));
    setOrders(totalOrders);
    console.log(totalOrders);
  };

  const handleNewApiKey = () => {
    history.push("/create-order");
  };

  const handleSearch = (query, value) => {
    let time;

    let filteredOrders = orders.filter((el) => {
      return el[value].includes(query) ? el : false;
    });

    if (time > 0) {
      clearTimeout(time);
    }

    time = setTimeout(() => {
      setOrders(filteredOrders);
    }, 2000);
  };

  console.log(orders);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <button onClick={() => handleNewApiKey()} className={styles.btn}>
          Generate New ApiKey
        </button>
      </div>
      <div>
        <p className={styles.mainHead}>API Keys</p>
        <Search handleSearch={handleSearch}></Search>
        {orders !== undefined && orders !== null ? (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <td>Sr.no</td>
                <td>Id</td>
                <td>API Key</td>
                <td>Date</td>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {orders.map((api, i) => (
                <tr key={api.id}>
                  <td>{i + 1}</td>
                  <td>{api.id}</td>
                  <td>{api.apiKey}</td>
                  <td>{api.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default PreviousOrders;
