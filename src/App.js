import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import OrderForm from "./Components/OrderForm/OrderForm";
import PreviousOrders from "./Components/PreviousOrders/PreviousOrders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={PreviousOrders}></Route>
          <Route exact path="/create-order" component={OrderForm}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
