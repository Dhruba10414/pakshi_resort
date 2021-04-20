import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { setUser, clearUser } from "./redux/user/userAction";
import { connect } from "react-redux";
import gsap from 'gsap';
import "./styles/App.scss";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FoodOrders from "./pages/FoodOrders";
import Book from "./pages/Book";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import FoodManagement from "./pages/FoodManagement";

import Home from "./pages/Guest/Home";
import Rooms from "./pages/Guest/Rooms";
import Facilities from "./pages/Guest/Facilities";
import Eat from "./pages/Guest/Eat";
import About from './pages/Guest/About';
import Contact from "./pages/Guest/Contact";
import Privacy from "./pages/Guest/Privacy";
import Sitemaps from "./pages/Guest/Sitemaps";
import RoomsUpdated from "./pages/Guest/RoomsUpdated";
import Room from "./pages/Guest/Room";
import BookInGuestSide from "./pages/Guest/BookInGuestSide";
import ActiveGuest from "./pages/ActiveGuest";
import BookingRequests from "./pages/BookingRequests";
import BookByGuest from "./pages/Guest/BookByGuest";
import Statics from "./pages/Statics";
import NotFound from "./pages/NotFound";

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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/facilities" component={Facilities} />
          <Route exact path="/rooms" component={RoomsUpdated} />
          <Route exact path="/room/delux-couple" component={Room} />
          <Route exact path="/room/delux-double" component={Room} />
          <Route exact path="/room/delux-twin" component={Room} />
          <Route exact path="/booking" component={BookInGuestSide} />
          {/* <Route exact path="/booking" component={BookByGuest} /> */}
          <Route exact path="/eat-drink" component={Eat} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/privacy-policy" component={Privacy} />
          <Route exact path="/sitemaps" component={Sitemaps} />

          {/* STAFF SECTION */}
          <Route exact path="/staff/login" render={() => !isLogedIn ? <Login/> : <Redirect to={{ pathname: '/staff/dashboard' }}/>} />
          <Route exact path="/staff/dashboard" render={() => isLogedIn ? <Dashboard /> : <Login /> } />
          <Route exact path="/staff/active-guests" render={() => isLogedIn ? <ActiveGuest /> : <Login /> } />
          <Route exact path="/staff/book" render={() => isLogedIn ? <Book /> : <Login /> } />
          <Route exact path="/staff/booking" render={() => isLogedIn ? <Booking/> : <Login /> } />
          <Route exact path="/staff/booking-request" render={() => isLogedIn ? <BookingRequests /> : <Login /> } />
          <Route exact path="/staff/foodorders" render={() => isLogedIn ? <FoodOrders /> : <Login /> } />
          <Route exact path="/staff/admin/staff" render={() => isLogedIn ? <Admin /> : <Login /> } />
          <Route exact path="/staff/admin/food" render={() => isLogedIn ? <FoodManagement /> : <Login /> } />
          <Route exact path="/staff/admin/statics" render={() => isLogedIn ? <Statics /> : <Login /> } />

          {/* NOT FOUND */}
          <Route component={NotFound} />
        </Switch>
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
