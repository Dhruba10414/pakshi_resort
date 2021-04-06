import React, { useState, useEffect } from "react";
// Components
import HomeContent from "../components/Home/HomeContent";
import Overlay from "../components/Home/Overlay";
// Animation
import { overlayAnimation } from '../animations/HomeAnim';


function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Handling animaion complete
  const completeAnimation = () => {
    setAnimationComplete(true);
    window.sessionStorage.setItem("firstLoadDone", 1);
  };

  // Load overlay animation once
  useEffect(() => {
    if(window.sessionStorage.getItem("firstLoadDone") == null){
      overlayAnimation(completeAnimation);
    } else{
      setAnimationComplete(true);
    }
  }, []);


  return (
    <>
    { animationComplete === false ? <Overlay /> : <HomeContent /> }
    </>
  );
}

export default Home;
