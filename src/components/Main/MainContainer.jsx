import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../AuthRegist/Auth/Auth";
import Regist from "../AuthRegist/Regist/Regist";

import Steal from "./componentMain/Steal/Steal";
import Main from "./Main";
import "./../../App.css";
import Sms from "./componentMain/SMS/Sms";
import DetailPage from "./componentMain/DetailPage/DetailPage";
import { useSelector } from "react-redux";
import Officer from "./componentMain/Officer/Officer";
import DetailOfficer from "./componentMain/Officer/DetailPageOfficer/DetailOfficer";

const MainContainer = () => {
  const [inputDis, setInputDis] = useState(true);
  const userDetail = useSelector((state) => state.detail.link);

  const userId = userDetail.id;

  return (
    <div className="rootMain">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/officer" element={<Officer />} />
        <Route path="/sms" element={<Sms />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/registration" element={<Regist />} />
        <Route path="/steal" element={<Steal />} />
        <Route
          path="/detailpage/:userId"
          element={<DetailPage setInputDis={setInputDis} inputDis={inputDis} />}
        />
        <Route
          path="/officer/:userId"
          element={
            <DetailOfficer setInputDis={setInputDis} inputDis={inputDis} />
          }
        />
      </Routes>
    </div>
  );
};

export default MainContainer;
