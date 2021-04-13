import React from "react";

function Events() {
  return (
    <>
      <div className="heading">
        <h2>Events</h2>
      </div>

      <div className="events">
        <div className="event">
          <div className="event__image-block meeting"></div>
          <div className="event__content-block">
            <h2>Meetings & Events</h2>
            <p>
              Getting ideas? Make them reality by hosting your next meeting or
              event at the Pakshi resort.
            </p>
          </div>
        </div>
        <div className="event">
          <div className="event__image-block wedding"></div>
          <div className="event__content-block">
            <h2>Weddings</h2>
            <p>
              Unforgettable occasions, tailored just for you. Have the wedding
              you envisioned from the moment you said “Yes!”
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
