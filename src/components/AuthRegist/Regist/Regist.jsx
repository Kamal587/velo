import React, { useRef, useState } from "react";
import passNo from "./../../../assets/images/passNo.png";
import passYes from "./../../../assets/images/passYes.png";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./Regist.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import $api from "../../API/serverAnswer";
YupPassword(Yup);

const URL = "https://sf-final-project-be.herokuapp.com/api/auth/sign_up";

const Regist = () => {
  const [reply, setReply] = useState("");
  const [passwordType, setPasswordType] = useState(passNo);
  const navigate = useNavigate();
  const registerHandler = async (values, { setSubmitting }) => {
    setPasswordType(passNo);

    const payload = {
      email: values.email,
      password: values.password,
      clientId: values.clientID,
    };

    try {
      const response = await $api.post("/auth/sign_up", payload);
      response.data.email && setReply("Регистрация прошла успешно");
      navigate("/auth");
    } catch (e) {
      console.log(e);
      setReply(`Пользователь с E-mail ${payload.email} существует`);
    } finally {
      setSubmitting(false);
    }
  };

  const passRef = useRef(null);
  const togglePassInput = () => {
    if (passwordType === passNo) {
      passRef.current.type = "text";
      setPasswordType(passYes);
    } else if (passwordType === passYes) {
      passRef.current.type = "password";
      setPasswordType(passNo);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Введите верный email")
      .required("Обязательное поле"),
    username: Yup.string()
      .matches(/^[A-Za-z0-9А-Яа-я]+$/, "Пароль введен некорректно")
      .min(5, "Слишком короткое имя")
      .max(32, "Слишком длинное имя"),

    surname: Yup.string()
      .matches(/^[A-Za-z0-9А-Яа-я]+$/, "Пароль введен некорректно")
      .min(5, "Слишком короткое имя")
      .max(32, "Слишком длинное имя"),

    password: Yup.string()
      .matches(/^[A-Za-z0-9А-Яа-я]+$/, "Пароль введен некорректно")
      .min(5, "Слишком короткий пароль")
      .max(32, "Слишком длинный пароль")

      .required("Обязательное поле"),

    clientID: Yup.string()

      .min(16, "Слишком короткий пароль")

      .required("Обязательное поле"),
  });

  return (
    <div className={style.root}>
      <div className={style.regist}>
        <h1 className={style.title}>Регистрация</h1>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={registerHandler}
        >
          {({ isValid, dirty, isSubmiting }) => (
            <Form className={style.form}>
              <label>E-mail</label>
              <Field
                type="email"
                name="email"
                className={style.input}
                placeholder={"Введите адрес эл. почты..."}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={style.error}
              />
              <br />
              <label>Пароль</label>
              <span className={style.pass}>
                <Field
                  type="password"
                  name="password"
                  className={style.input}
                  placeholder={"Введите пароль..."}
                  innerRef={passRef}
                />
                <img
                  className={style.icon}
                  src={passwordType}
                  onClick={() => togglePassInput()}
                ></img>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.error}
                />
              </span>
              <br />
              <label>Имя</label>
              <Field
                type="username"
                name="username"
                className={style.input}
                placeholder={"Введите логин..."}
              />
              <ErrorMessage
                name="username"
                component="div"
                className={style.error}
              />
              <br />
              <label>Фамилия</label>
              <Field
                type="surname"
                name="surname"
                className={style.input}
                placeholder={"Введите фамилию..."}
              />
              <ErrorMessage
                name="surname"
                component="div"
                className={style.error}
              />
              <br />

              <label>Введите Client ID</label>
              <div className={style.pass}>
                <Field
                  type="text"
                  name="clientID"
                  className={style.input}
                  placeholder={"Введите  Client ID..."}
                />
                <ErrorMessage
                  name="clientID"
                  component="div"
                  className={style.error}
                />
              </div>

              <br />

              <p className={style.textReg}>
                <br />
                <div className={style.reply}>{reply}</div>
                <Link to="/auth" className={style.reg}>
                  {" "}
                  Я уже ЗАРЕГИСТРИРОВАН
                </Link>
              </p>

              <button
                className={style.btn}
                type={"submit"}
                disabled={isSubmiting}
              >
                Вперед
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Regist;
