import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import ContentBox from "../components/StaffSection/ContentBox";
import Registration from "../components/Admin/Registration";
import Staffs from "../components/Admin/Staffs";
// urls
import {api} from "../assets/URLS";

function Admin() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch staffs
  const GetStaffs = () => {
    setLoading(true);
    const refresh_token = localStorage.getItem("refresh_token");
    axios
    .post(api.refresh, {refresh: refresh_token})
    .then((token) => {
      const Config = {headers: { Authorization: "Bearer " + token.data.access },};
      // fetch users
      axios.get(api.get_all_users, Config)
      .then((res) => { setStaffs(res.data); setLoading(false);})
      .catch(() => {console.clear();});
    });
  };

  useEffect(() => {
    GetStaffs();
  }, []);

  return (
    <ContentBox heading="Staff Management">
      <div className="admin">
        <Registration />
        <Staffs stafflist={staffs} loading={loading}/>
      </div>
    </ContentBox>
  );
}

export default Admin;
