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

function App({ setUser, isLogedIn }) {
  // const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const retrievedObject = localStorage.getItem("user");
      setUser(JSON.parse(retrievedObject));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {/* GUEST SECTION */}
        <Route exact path="/" component={Home} />

        {/* STAFF SECTION */}
        <Route exact path="/staff/login" render={() => !isLogedIn ? <Login/> : <Redirect to={{ pathname: '/staff/dashboard' }}/>} />
        <Route exact path="/staff/dashboard" render={() => isLogedIn ? <Dashboard /> : <Login /> } />
        <Route exact path="/staff/book" render={() => isLogedIn ? <Book /> : <Login /> } />
        <Route exact path="/staff/guests" render={() => isLogedIn ? <Guests /> : <Login /> } />
        <Route exact path="/staff/foodorders" render={() => isLogedIn ? <FoodOrders /> : <Login /> } />
        <Route exact path="/staff/park" render={() => isLogedIn ? <ParkVisitors /> : <Login /> } />
        <Route exact path="/staff/admin" render={() => isLogedIn ? <Admin /> : <Login /> } />
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
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
