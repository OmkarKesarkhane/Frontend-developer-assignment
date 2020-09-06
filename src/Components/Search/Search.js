import React, { useState, useContext } from "react";
import styles from "./Search.module.scss";
import { OrderContext } from "../../Context/Context";
import { SEARCH } from "../../Context/ActionTypes";

function Search() {
  const { dispatch } = useContext(OrderContext);

  const [selected, setSelected] = useState("id");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleQuery = (e) => {
    let query = e.target.value;
    let time;

    //Used Debouncing

    if (time > 0) {
      clearTimeout(time);
    }

    time = setTimeout(() => {
      dispatch({
        type: SEARCH,
        payload: { query, selected },
      });
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.inputContainer}>
          <select
            value={selected}
            className={styles.select}
            onChange={(e) => handleSelect(e)}
          >
            <option value="date">Date</option>
            <option value="id">Order-Id</option>
          </select>
          <input
            className={styles.input}
            id="input"
            placeholder="Enter value"
            onChange={(e) => handleQuery(e)}
          ></input>
        </div>
        {/* <div className={styles.btnContainer}>
          <button className={styles.btn} type="submit">
            Search
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default Search;
