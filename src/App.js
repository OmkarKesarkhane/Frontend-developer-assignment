import React, { useReducer } from "react";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import OrderForm from "./Components/OrderForm/OrderForm";
import PreviousOrders from "./Components/PreviousOrders/PreviousOrders";
import { OrderContext } from "./Context/Context";
import Reducer from "./Context/Reducer";

let initialState = {
  query: null,
  selected: null,
  orders: null,
  loader: false,
};

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <div className="App">
      <OrderContext.Provider value={{ state, dispatch }}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={PreviousOrders}></Route>
            <Route exact path="/create-order" component={OrderForm}></Route>
          </Switch>
        </HashRouter>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
