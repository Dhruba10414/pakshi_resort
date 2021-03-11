import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.scss";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/staff/login" component={Login} />
        {/* <Route component={NotFound} /> */}
        
      </Router>
    </div>
  );
}

export default App;
