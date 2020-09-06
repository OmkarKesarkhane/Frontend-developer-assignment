import React, { useState } from "react";
import { v4 } from "uuid";
import styles from "./OrderForm.module.scss";
import moment from "moment";

function OrderForm({ getData }) {
  const [numofApis, setNumofApis] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [panCard, setPanCard] = useState();

  // reset form after submit
  const resetForm = () => {
    setNumofApis(0);
    setName("");
    setEmail("");
    setAddress("");
    setPanCard("");
  };

  //order form submission & data is stored in local Storage
  //uuid is used for apiKey & id & moment for date formating
  const handleSubmit = (e) => {
    e.preventDefault();
    let newOrder = () => {
      return {
        id: v4(),
        name,
        email,
        address,
        panCard,
        date: moment().format("LL"),
        apiKey: v4(),
      };
    };
    for (let i = 0; i < numofApis; i++) {
      if (JSON.parse(localStorage.getItem("Orders") === null)) {
        localStorage.setItem("Orders", JSON.stringify([newOrder()]));
      } else {
        let orders = JSON.parse(localStorage.getItem("Orders"));
        localStorage.setItem("Orders", JSON.stringify([...orders, newOrder()]));
      }
    }

    resetForm();
  };

  return (
    <div className={styles.container}>
      <p className={styles.main}>Generate Api Key</p>
      <form className={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formGroup}>
          <label>Number of Api Keys</label>
          <input
            type="number"
            value={numofApis}
            onChange={(e) => setNumofApis(e.target.value)}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>PAN card number</label>
          <input
            type="text"
            value={panCard}
            onChange={(e) => setPanCard(e.target.value)}
          ></input>
        </div>
        <div className={styles.paymentDetails}>
          <p className={styles.payment}>Payment Methods</p>
          <p className={styles.method}>Accept credit cards</p>
          <p className={styles.method}> Apple Pay.</p>
          <p className={styles.method}> Accept Checks</p>
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
