import React from "react";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
// Image
import resort from "../../assets/images/View/garden-9.jpg";
import bridge from "../../assets/images/View/bridge.jpg";

function About() {
  return (
    <>
      <div className="about">
        <div className="about__heading">
          <h1>
            <div><span>Welcome to the Pakshi Resort</span></div>
          </h1>
        </div>

        <div className="about__description">
          <div className="desc-container">
            <div className="about-texts">
              <h2>
                Pakshi resort offers you the perfect blend of nature with
                comfortable accommodation facilities at Pabna
              </h2>
              <p>
                Pakshi Resort is an exclusive, private and river view resort
                lush with tropical plants by the side of mighty river padma
                which cover 33 acres of land.
              </p>
              <p>
                The Pakshi Resort offers comfortable loading, romantic dining
                and family fun in an our amazing Indoor Wave Pool. We offer
                Hotel packages throughout the year and accommodate groups for
                function, meetings, reunions, etc. The resort can also assist in
                playing your special wedding in your open zoon.
              </p>
              <h3>Pakshi Resort</h3>
            </div>
            <div className="about-images">
              <img src={resort} className="img-1" alt="" />
            </div>
          </div>
        </div>

        <div className="about__drone"></div>

        <div className="about__description">
          <div className="desc-container">
            <div className="about-texts history">
              <h2>
                Short history & Heritage of Pakshi 
              </h2>
              <p>
                Pakshi is railway historical place and The famous Harding Bridge
                is walking distance from Pakshi Resort. Once upon a time Pakshi
                was the main point of communicating with Kolkata through the
                river Padma.
              </p>
              <p>
                Pakshi has its own natural beauty and proud of railway division,
                automatic energy center, Sugar can research institute, Dal
                Research institute, Ishurdi EPZ, Pakshi paper mill, Ishurdi
                Railway Jongshon, Airport, Lalon shah bridge and seasonal fruits
                like lichi.
              </p>
            </div>
            <div className="about-images">
              <img src={bridge} alt="" />
            </div>
          </div>
        </div>

      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default About;

{
  /* 
              <p>
                The pakshi Resort is within only 3 hour drive from Dhaka and
                only 1 hour drive from Jamuna Bridge
              </p>
              <p>
                Escape with this monotomus life with its entire family and we
                are sure that you would never want to be back from the resort
              </p> */
}
