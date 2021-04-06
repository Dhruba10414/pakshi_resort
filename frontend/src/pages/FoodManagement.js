import React, {useState} from 'react';
import AddFood from '../components/FoodManagement./AddFood';
import FreeSpace from '../components/FoodManagement./FreeSpace';
import Menu from '../components/FoodManagement./Menu';
import MenuUpdate from '../components/FoodManagement./MenuUpdate';
import ContentBox from "../components/StaffSection/ContentBox";

function FoodManagement() {
    const [selectedFood, setSelectedFood] = useState(null);
    const [addFood, setAddFood] = useState(false);

    // SELECT A FOOD FOR UPDATE
    const selectAfood = (id, type, name, desc, price, available) => {
        setAddFood(false);
        setSelectedFood({id: id, type: type, name: name, desc: desc, price: price, available: available});
    }

    // CANCEL UPDATE
    const cancelUpdate = () => {
        setAddFood(false);
        setSelectedFood(null);
    }

    return (
        <ContentBox heading="Food Management">
            <div className="foodManagement">
                <Menu selectAfood ={selectAfood} />
                {
                    addFood ? <AddFood cancelUpdate={cancelUpdate} />
                    : selectedFood === null
                        ? <FreeSpace setAddFood={setAddFood} />
                        : <MenuUpdate selectedFood={selectedFood} cancelUpdate={cancelUpdate} />
                }
            </div>
        </ContentBox>
    )
}

export default FoodManagement
