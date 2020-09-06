import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import styles from "./OrderForm.module.scss";
import moment from "moment";

function OrderForm({ getData }) {
  const [numofApis, setNumofApis] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [panCard, setPanCard] = useState();
  const [valid, setValid] = useState(false);

  // reset form after submit
  const resetForm = () => {
    setNumofApis(0);
    setName("");
    setEmail("");
    setAddress("");
    setPanCard("");
  };

  useEffect(() => {
    if (
      name !== undefined &&
      numofApis !== undefined &&
      email !== undefined &&
      address !== undefined &&
      panCard !== undefined
    ) {
      if (name.length > 20) {
        console.log(name);
        setValid(false);
      } else if (!email.includes("@") || email.length < 5) {
        console.log(email);
        setValid(false);
      } else if (address.length < 1) {
        console.log(address);
        setValid(false);
      } else if (panCard.length !== 10) {
        console.log(panCard);
        setValid(false);
      } else {
        console.log("valid");
        setValid(true);
      }
    }
  }, [name, numofApis, email, address, panCard]);

  //order form submission & data is stored in local Storage
  //uuid is used for apiKey & id & moment for date formating
  const handleSubmit = (e) => {
    console.log("hello");
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
          <label>Email (*Must include "@")</label>
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
          <label>PAN card number (*Must be of 10 Characters)</label>
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
        <button
          type="submit"
          style={
            valid
              ? { backgroundColor: "#9246f6" }
              : { backgroundColor: "#d0a4fc" }
          }
          className={styles.btn}
          disabled={!valid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
