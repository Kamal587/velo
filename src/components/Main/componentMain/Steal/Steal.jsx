import React, { useEffect, useState } from "react";
import style from "./Steal.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import $api from "../../../API/serverAnswer";

const URLAuth = "https://sf-final-project-be.herokuapp.com/api/cases/";
const URLPublic = "https://sf-final-project-be.herokuapp.com/api/public/report";
const clientID = "c709213a-7f74-11ed-a1eb-0242ac120002";
const officersApi = "https://sf-final-project-be.herokuapp.com/api/officers/";
const Steal = () => {
  const token = useSelector((state) => state.user.token);
  const [officers, setOfficers] = useState([]);
  console.log(officers);
  const handleSubmit = (values) => {
    token ? createCase(values) : createCasePublic(values);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    try {
      token &&
        fetch(officersApi, options)
          .then((response) => response.json())
          .then((result) => setOfficers(result.officers));
    } catch (e) {
      console.log(e.response);
    } finally {
    }
  }, []);

  const createCase = async (values, { setSubmitting }) => {
    const payload = {
      licenseNumber: values.licenseNumber,
      ownerFullName: values.username,
      type: values.typeVelo,
    };

    try {
      const response = await $api.post("/cases/", payload);

      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  const createCasePublic = async (values) => {
    const payload = {
      licenseNumber: values.licenseNumber,
      ownerFullName: values.username,
      type: values.typeVelo,
      clientId: clientID,
    };

    try {
      const response = await $api.post("/public/report", payload);
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const validationSchema = Yup.object({
    licenseNumber: Yup.string().required("???????????????????????? ????????"),
    username: Yup.string()

      .min(3, "?????????????? ???????????????? ??????")
      .required("???????????????????????? ????????"),
  });

  return (
    <div className={style.root}>
      <div className={style.wrap}>
        <Formik
          initialValues={{
            licenseNumber: "",
            username: "",
            typeVelo: "",
            color: "",
            data: "",
            text: "",
            officer: "",
          }}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty, isSubmiting }) => (
            <Form className={style.form}>
              <h1 className={style.title}>???????????????? ?? ??????????</h1>
              <div className={style.blog}>
                <label>?????????? ????????????????</label>
                <span className={style.pass}>
                  <Field
                    type="text"
                    name="licenseNumber"
                    className={style.input}
                    placeholder={"?????????????? ?????????? ????????????????..."}
                  />
                  <ErrorMessage
                    name="licenseNumber"
                    component="div"
                    className={style.error}
                  />
                </span>
              </div>
              <div className={style.blog}>
                <label>?????? ??????????????</label>
                <span className={style.pass}>
                  <Field
                    type="text"
                    name="username"
                    className={style.input}
                    placeholder={"?????????????? ?????? ??????????????..."}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={style.error}
                  />
                </span>
              </div>
              <div className={style.blog}>
                <label>?????? ????????????????????</label>
                <span className={style.pass}>
                  <Field
                    as="select"
                    name="typeVelo"
                    className={style.input}
                    placeholder={"?????? ????????????????????..."}
                  >
                    <option>???????????????? ?????? ????????????????????</option>
                    <option value="general">general</option>
                    <option value="sport">sport</option>
                  </Field>
                </span>
              </div>
              <div className={style.blog}>
                <label>???????? ????????????????????</label>
                <span className={style.pass}>
                  <Field
                    type="text"
                    name="color"
                    className={style.input}
                    placeholder={"?????????????? ???????? ????????????????????..."}
                  />
                  <ErrorMessage
                    name="color"
                    component="div"
                    className={style.error}
                  />
                </span>
              </div>
              <div className={style.blog}>
                <label>???????? ??????????</label>
                <span className={style.pass}>
                  <Field
                    type="data"
                    name="data"
                    className={style.input}
                    placeholder={"??????????????  ???????? ??????????..."}
                  />
                  <ErrorMessage
                    name="data"
                    component="div"
                    className={style.error}
                  />
                </span>
              </div>
              <div className={style.blog}>
                <label>???????????????????????????? ????????????????????</label>
                <span className={style.pass}>
                  <Field
                    component="textarea"
                    name="text"
                    className={style.textarea}
                    placeholder={"???????? ?????? ????????????????..."}
                  />
                  <ErrorMessage
                    name="text"
                    component="div"
                    className={style.error}
                  />
                </span>
              </div>
              {token && (
                <div className={style.blog}>
                  <label>?????????????????????????? ??????????????????</label>
                  <span className={style.pass}>
                    <Field
                      placeholder={"???????????????? ???????????????????????????? ????????????????????"}
                      as="select"
                      name="officer"
                      className={style.input}
                    >
                      <option>???????????????? ???????????????????????????? ????????????????????</option>
                      {officers.map((item) => (
                        <option key={item.id} value={item.email}>
                          {item.email}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="typeVelo"
                      component="div"
                      className={style.error}
                    />
                  </span>
                </div>
              )}

              <button
                className={style.btn}
                type={"submit"}
                disabled={isSubmiting}
              >
                ??????????????????
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Steal;
