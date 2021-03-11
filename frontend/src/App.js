import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.scss";

// Pages
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        {/* <Route component={NotFound} /> */}
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
