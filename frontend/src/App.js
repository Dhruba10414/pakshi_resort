import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setUser, clearUser } from "./redux/user/userAction";
import { connect } from "react-redux";
import "./styles/App.scss";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Guests from "./pages/Guests";
import FoodOrders from "./pages/FoodOrders";
import ParkVisitors from "./pages/ParkVisitors";
import Book from "./pages/Book";
import Admin from "./pages/Admin";

function App({setUser, clearUser, isLogedIn}) {
  useEffect(() => {
    if(localStorage.getItem('user')){
      console.log("Ache")
      const retrievedObject = localStorage.getItem('user')
      setUser(JSON.parse(retrievedObject));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />

        {/* STAFF SECTION */}
        <Route exact path="/staff/dashboard" render={ () => isLogedIn ? <Dashboard /> : <Redirect to={{ pathname: '/staff/login' }} />} />
        <Route exact path="/staff/guests" render={ () => isLogedIn ? <Guests /> : <Redirect to={{ pathname: '/staff/login' }} />} />
        <Route exact path="/staff/foodorders" render={ () => isLogedIn ? <FoodOrders /> : <Redirect to={{ pathname: '/staff/login' }} />} />
        <Route exact path="/staff/admin" render={ () => isLogedIn ? <Admin /> : <Redirect to={{ pathname: '/staff/login' }} />} />
        <Route exact path="/staff/park" render={ () => isLogedIn ? <ParkVisitors /> : <Redirect to={{ pathname: '/staff/login' }} />} />
        <Route exact path="/staff/book" render={ () => isLogedIn ? <Book /> : <Redirect to={{ pathname: '/staff/login' }} />} />
        <Route exact path="/staff/login" render={ () => !isLogedIn ? <Login /> : <Redirect to={{ pathname: '/staff/dashboard' }} />} />

        {/* <Route exact path="/staff/login" component={Login} /> */}
        {/* <Route exact path="/staff/dashboard" component={Dashboard} />
        <Route exact path="/staff/guests" component={Guests} />
        <Route exact path="/staff/foodorders" component={FoodOrders} />
        <Route exact path="/staff/park" component={ParkVisitors} />
        <Route exact path="/staff/book" component={Book} />
        <Route exact path="/staff/admin" component={Admin} /> */}
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogedIn: state.user.isLogedIn,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    clearUser: () => { dispatch(clearUser())},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);