import React from 'react';
import FoodOrder from "../components/Restaurent/FoodOrder";
import ContentBox from '../components/StaffSection/ContentBox';

function Restaurent() {
    return (
        <ContentBox heading="Restaurent">
            <div className="restaurent">
                <FoodOrder fromRestaurent={true} />
            </div>
        </ContentBox>
    )
}

export default Restaurent
