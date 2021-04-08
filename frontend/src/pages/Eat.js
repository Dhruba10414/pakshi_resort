import React, { useEffect } from "react";
// Components
import Footer from "../components/Footer";
import Navigation from "../components/Navigation/Navigation";
// Images
import eat1 from "../assets/images/Restaurent/restaurent-8.JPG";
import eat2 from "../assets/images/Restaurent/restaurent-5.jpg";
import eat3 from "../assets/images/Restaurent/restaurent-7.jpg";
import eat4 from "../assets/images/Restaurent/restaurent-9.jpg";
import eat5 from "../assets/images/Restaurent/restaurent-10.jpg";
import eat6 from "../assets/images/Restaurent/restaurent-2.jpg";
import eat7 from "../assets/images/Restaurent/food-3.jpeg";
import bar1 from "../assets/images/Restaurent/bar-1.jpg";
import bar2 from "../assets/images/Restaurent/bar-2.jpg";

function Eat() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="eatsDrinks">
        {/* heading */}
        <div className="eatsDrinks__heading">
          <h1>
            <div><span>We are popping the corks and laying the table for ultimate</span></div>
            <div><span>fine dining experience.</span></div>
          </h1>
        </div>

        <div className="eatsDrinks__resturent">
          <div className="resturent-container">
            <div className="resturent-image">
              <img className="img-on" src={eat1} alt="" />
            </div>
            <div className="resturent-desc">
              <h3>Simple & Minimal</h3>
              <h2>Main Restaurant</h2>
              <p>
                Our main restaurants are run by some experienced chefs and
                waiters which is an ideal place for a delightful and satisfying
                meal for your family and friends. We have Bengali, Chinese and
                Indian food menu according to your taste and desire.
              </p>
              <img className="img-tw" src={eat2} alt="" />
            </div>
          </div>
          <img className="img-th" src={eat6} alt="" />
        </div>

        <div className="eatsDrinks__cresturent">
          <div className="cresturent-container">
            <div className="cresturent-desc">
              <h3>Aesthetic</h3>
              <h2>Eating Corner</h2>
              <p>
                If you want, you can surprise your family, friends or loved ones
                by arranging a different type meal in our asthetic eating
                corner.
              </p>
            </div>
            <div className="cresturent-image">
              <img src={eat3} alt="" />
            </div>
          </div>
        </div>

        <div className="eatsDrinks__resturent eatsDrinks__gresturent">
          <div className="resturent-container">
            <div className="resturent-image">
              <img className="img-on" src={eat4} alt="" />
            </div>
            <div className="resturent-desc">
              <h3>Outdoor</h3>
              <h2>Garden Party</h2>
              <p>
                You can dine with your family, colleagues or friends in a
                charming environment under the open sky where you will be
                surrounded by greenery and birdsong. This is the perfect place
                for your small family ceremony and office gate together.
              </p>
              <img className="img-tw" src={eat5} alt="" />
            </div>
          </div>
        </div>

        <div className="eatsDrinks__shef">
          <div className="cresturent-container">
            <div className="cresturent-desc">
              <h3>Special</h3>
              <h2>Barbecue Party</h2>
              <p>
                You may like or dislike kebabs. But we can assure you that our
                Barbecue will create a extra excitement to your family reunion.
                We have two experienced chef who will bring a great joy in your
                family party by making awsome BBQ.
              </p>
            </div>
            <div className="cresturent-image">
              <img src={eat7} alt="" />
            </div>
          </div>
        </div>

        <div className="eatsDrinks__resturent eatsDrinks__gresturent">
          <div className="resturent-container">
            <div className="resturent-image">
              <img className="img-on" src={bar1} alt="" />
            </div>
            <div className="resturent-desc">
              <h3>Delightful</h3>
              <h2>Juice Bar</h2>
              <p>
                Come and meet our team of creative mixologists. for signature,
                vintage drinks and some serious glamour. We offet you a small
                but comfortable juice bar for your satisfaction.
              </p>
              <img
                className="img-tw"
                src={bar2}
                style={{ width: "100%", marginLeft: 0 }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default Eat;
