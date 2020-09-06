import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./PreviousOrders.module.scss";
import Search from "../Search/Search";
import { OrderContext } from "../../Context/Context";
import { TOTAL_ORDERS } from "../../Context/ActionTypes";

function PreviousOrders() {
  const { state, dispatch } = useContext(OrderContext);
  let { query, selected, orders } = state;

  let totalOrder = JSON.parse(localStorage.getItem("Orders"));

  const history = useHistory();

  //Route to order Page
  const handleNewApiKey = () => {
    history.push("/create-order");
  };

  //Get data from local storage & if query filter accordingly

  useEffect(() => {
    let totalOrder = JSON.parse(localStorage.getItem("Orders"));

    if (totalOrder !== null) {
      let filteredOrders = totalOrder.filter((el) => {
        if (query === undefined || query === null) {
          return el;
        } else {
          return el[selected].includes(query) ? el : false;
        }
      });

      dispatch({
        type: TOTAL_ORDERS,
        payload: filteredOrders,
      });
    }
  }, [dispatch, query, selected]);

  return (
    <div className={styles.container}>
      <p className={styles.mainHead}>API Keys</p>

      <div className={styles.topContainer}>
        <Search></Search>
        <div className={styles.btnContainer}>
          <button onClick={() => handleNewApiKey()} className={styles.btn}>
            Generate New ApiKey
          </button>
        </div>
      </div>
      {totalOrder !== null ? (
        <div className={styles.tableContainer}>
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
                {state.orders.map((api, i) => (
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
      ) : (
        <div className={styles.tableContainer}>
          Sorry, You don't have ApiKeys. Please generate ApiKeys
        </div>
      )}
    </div>
  );
}

export default PreviousOrders;
