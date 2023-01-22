import React from "react";
import style from "./Main.module.css";
import iconPur from "./../../assets/images/iconPur.png";
import stepcard1 from "./../../assets/images/stepcard1.png";
import stepcard2 from "./../../assets/images/stepcard2.png";
import stepcard3 from "./../../assets/images/stepcard3.png";

const Main = () => {
  return (
    <div className={style.root}>
      <div className={style.fonVelo}>
        <div className={style.fonBlack}></div>
        <div className={style.wrap}>
          <div className={style.purpose}>
            <div className={style.imgPur}>
              <img src={iconPur} alt="" />
              <div className={style.textImg}>CITY BIKE</div>
            </div>
            <div className={style.textPur}>
              <div className={style.titlePur}>
                СИСТЕМА АВТОМАТИЗИРОВАННОГО ВЕЛОПРОКАТА
              </div>
              <div className={style.text}>
                Цель проекта - создать альтернативу автомобилю и общественному
                транспорту, предоставить жителям города и туристам доступный
                транспорт для передвижения.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.list}>
        <div className={style.wrap}>
          <div className={style.steps}>
            <img src={stepcard1} alt="" className={style.step} />
            <img src={stepcard2} alt="" className={style.step} />
            <img src={stepcard3} alt="" className={style.step} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
