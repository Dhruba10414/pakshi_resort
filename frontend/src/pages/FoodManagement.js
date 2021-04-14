import React, { useState } from "react";

// Components
import AddFood from "../components/FoodManagement/AddFood";
import FreeSpace from "../components/FoodManagement/FreeSpace";
import Menu from "../components/FoodManagement/Menu";
import MenuUpdate from "../components/FoodManagement/MenuUpdate";
import ContentBox from "../components/StaffSection/ContentBox";
//Redux
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";

function FoodManagement(props) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [addFood, setAddFood] = useState(false);
  const [changed, setChanged] = useState(false);

  // SELECT A FOOD FOR UPDATE
  const selectAfood = (id, type, name, desc, price, available) => {
    setAddFood(false);
    setSelectedFood({
      id: id,
      type: type,
      name: name,
      desc: desc,
      price: price,
      available: available,
    });
  };

  // CANCEL UPDATE
  const cancelUpdate = () => {
    setAddFood(false);
    setSelectedFood(null);
  };

  return (
    <ContentBox heading="Food Management">
      <div className="foodManagement">
        <Menu selectAfood={selectAfood} changed={changed} />
        {addFood ? (
          <AddFood
            cancelUpdate={cancelUpdate}
            clearUser={props.clearUser}
            setChanged={setChanged}
          />
        ) : selectedFood === null ? (
          <FreeSpace setAddFood={setAddFood} />
        ) : (
          <MenuUpdate
            selectedFood={selectedFood}
            cancelUpdate={cancelUpdate}
            setChanged={setChanged}
            clearUser={props.clearUser}
          />
        )}
      </div>
    </ContentBox>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(null, mapDispatchToProps)(FoodManagement);
