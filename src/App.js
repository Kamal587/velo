import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainContainer from "./components/Main/MainContainer";
import { setUser } from "./store/slice";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <div
      className="App"
      onClick={() => menuActive && setMenuActive(!menuActive)}
    >
      <Header menuActive={menuActive} setMenuActive={setMenuActive} />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;
