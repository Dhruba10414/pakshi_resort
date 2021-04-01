import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setUser, clearUser } from "./redux/user/userAction";
import { connect } from "react-redux";
import gsap from 'gsap';
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
import Rooms from "./pages/Rooms";
import Facilities from "./pages/Facilities";
import Eat from "./pages/Eat";
import FoodManagement from "./pages/FoodManagement";

function App({ setUser, isLogedIn }) {
  // const location = useLocation();
  useEffect(() => {
    gsap.to('body', 0, {css: {visibility: "visible"}});
    
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
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/facilities" component={Facilities} />
        <Route exact path="/eat-drink" component={Eat} />

        {/* STAFF SECTION */}
        <Route exact path="/staff/login" render={() => !isLogedIn ? <Login/> : <Redirect to={{ pathname: '/staff/dashboard' }}/>} />
        <Route exact path="/staff/dashboard" render={() => isLogedIn ? <Dashboard /> : <Login /> } />
        <Route exact path="/staff/book" render={() => isLogedIn ? <Book /> : <Login /> } />
        <Route exact path="/staff/guests" render={() => isLogedIn ? <Guests /> : <Login /> } />
        <Route exact path="/staff/foodorders" render={() => isLogedIn ? <FoodOrders /> : <Login /> } />
        <Route exact path="/staff/park" render={() => isLogedIn ? <ParkVisitors /> : <Login /> } />
        <Route exact path="/staff/admin/staff" render={() => isLogedIn ? <Admin /> : <Login /> } />
        <Route exact path="/staff/admin/food" render={() => isLogedIn ? <FoodManagement /> : <Login /> } />
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
