import React from 'react';
import ContentBox from '../components/StaffSection/ContentBox';
import Ticket from "../components/ParkTicket/Ticket";

function ParkTicket() {
    return (
        <ContentBox heading="Park Ticket">
            <div className="parkticket">
                <Ticket  />
            </div>
        </ContentBox>
    )
}

export default ParkTicket
