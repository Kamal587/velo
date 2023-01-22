import React from "react";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={style.root}>
      <div className={style.wrap}>
        <div className={style.blogs}>
          <div className={style.item1}>
            <div className={style.title}>МЫ В СОЦСЕТЯХ</div>
            <div className={style.blog}>
              <div className={style.net}>Официальная группа Facebook</div>
              <div className={style.net}>Официальная группа Instagram</div>
              <div className={style.net}>Официальная группа VK</div>
            </div>
          </div>
          <div className={style.item2}>
            <div className={style.title}>ОТДЕЛ ПРОДАЖ</div>
            <div className={style.textSale}>
              Ледовая арена «Олимпик» <br /> Адрес: проспект Пушкина, 44/1,
              График работы: Понедельник-Суббота с 09:00 до 18:00.
              <br /> Перерыв: 13:00-14:00.
            </div>
          </div>
          <div className={style.item3}>
            <div className={style.title}>СЛУЖБА ПОДДЕРЖКИ</div>
            <div className={style.blog}>
              <div className={style.tel}>+7 999 666 55 44</div>
              <div className={style.textSup}>Круглосуточно</div>
              <div className={style.text}>Обратная связь</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
