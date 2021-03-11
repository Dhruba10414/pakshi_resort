import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.scss";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Guests from "./pages/Guests";
import FoodOrders from "./pages/FoodOrders";
import ParkVisitors from "./pages/ParkVisitors";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/staff/login" component={Login} />
        <Route exact path="/staff/dashboard" component={Dashboard} />
        <Route exact path="/staff/guests" component={Guests} />
        <Route exact path="/staff/foodorders" component={FoodOrders} />
        <Route exact path="/staff/park" component={ParkVisitors} />
      </Router>
    </div>
  );
}

export default App;
