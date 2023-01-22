import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import passNo from "./../../../assets/images/passNo.png";
import passYes from "./../../../assets/images/passYes.png";
import style from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../../store/slice";
import $api from "../../API/serverAnswer";

const URL = "https://sf-final-project-be.herokuapp.com/api/auth/sign_in";

const Auth = () => {
  const [passwordType, setPasswordType] = useState(passNo);
  const passRef = useRef(null);
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authHandler = async (values, { setSubmitting }) => {
    setPasswordType(passNo);

    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await $api.post("/auth/sign_in", payload);
      console.log(response);
      dispatch(
        setUser({
          token: response.data.data.token,
        })
      );
      navigate("/");
    } catch (e) {
      console.log(e);
      const error = e.response.data.message;
      setReply(error);
    } finally {
      setSubmitting(false);
    }
  };

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
    password: Yup.string().required("Обязательное поле"),
  });
  return (
    <div className={style.root}>
      <div className={style.regist}>
        <h1>Вход</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={authHandler}
        >
          {({ isValid, dirty, isSubmiting }) => (
            <Form className={style.form}>
              <br />
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
              <div className={style.pass}>
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
              </div>

              <br />
              <div className={style.reply}>{reply}</div>
              <br />
              <p className={style.textReg}>
                Если у вас нет учетной записи, <br />
                <Link to="/registration" className={style.reg}>
                  {" "}
                  ЗАРЕГИСТРИРУЙТЕСЬ
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

export default Auth;
