import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./DetailOfficer.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import $api from "../../../../API/serverAnswer";

const DetailOfficer = ({ inputDis, setInputDis }) => {
  const token = useSelector((state) => state.user.token);
  const officerDetail = useSelector((state) => state.detail.dataOfficer);
  const [officers, setOfficers] = useState();
  const navigate = useNavigate();

  const [resolutionValue, setResolutionValue] = useState(
    officerDetail.resolution
  );

  const [nameOfficer, setNameOfficer] = useState(officerDetail.firstName);
  const [lastNameOfficer, setLastNameOfficer] = useState(
    officerDetail.lastName
  );
  const [idOfficer, setIdOfficer] = useState(officerDetail._id);

  const [checkValue, setCheckValue] = useState(officerDetail.approved);

  useEffect(() => {
    !officerDetail && navigate("/");
  }, []);

  useEffect(() => {
    if (resolutionValue && resolutionValue.length > 0) {
      setInputDis(false);
    } else if (!resolutionValue || resolutionValue.length === 0) {
      setInputDis(true);
    }
  }, [resolutionValue]);

  const authHandler = async (values) => {
    const payload = {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },

      approved: checkValue,
      firstName: nameOfficer,
      lastName: lastNameOfficer,
    };

    try {
      console.log(payload);

      const response = await $api.put(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officerDetail._id}`,

        payload
      );
    } catch (e) {
      console.log(e);
      const error = e.response.data.message;
    } finally {
      navigate("/officer");
    }
  };

  const validationSchema = Yup.object({
    password: Yup.string()

      .min(6, "Пароль должен содержать минимум шесть символов")
      .max(32, "Слишком длинный пароль"),
  });

  return (
    <div>
      <div className={style.root}>
        <div className={style.regist}>
          <Formik
            initialValues={{
              clientId: "",
              email: "",
              name: "",
              lastName: "",
              id: "",
              password: "",
              checkApplo: "",
            }}
            validationSchema={validationSchema}
            onSubmit={authHandler}
          >
            {({ isSubmiting, handleChange }) => (
              <Form className={style.form}>
                <h1 className={style.title}>
                  ДЕТАЛЬНАЯ СТРАНИЦА <br /> ОТВЕТСТВЕННОГО СОТРУДНИКА
                </h1>
                <br />
                <div className={style.dataInput}>
                  <label>ClientId сотрудника :</label>
                  <Field
                    type="text"
                    name="clientId"
                    className={style.inputRead}
                    value={officerDetail.clientId}
                    readOnly
                  />
                </div>

                <br />
                <div className={style.dataInput}>
                  <label>Email сотрудника :</label>
                  <Field
                    type="text"
                    name="email"
                    className={style.inputRead}
                    value={officerDetail.email}
                    readOnly
                  />
                </div>

                <br />
                <div className={style.dataInput}>
                  <label>Имя сотрудника :</label>
                  <Field
                    type="text"
                    name="name"
                    className={style.inputRead}
                    value={nameOfficer}
                    onChange={(e) => setNameOfficer(e.target.value)}
                  />
                </div>
                <br />
                <div className={style.dataInput}>
                  <label>Фамилия сотрудника :</label>
                  <Field
                    type="text"
                    name="lastName"
                    className={style.inputRead}
                    value={lastNameOfficer}
                    onChange={(e) => setLastNameOfficer(e.target.value)}
                  />
                </div>
                <br />
                <div className={style.dataInput}>
                  <label>Идентификатор сотрудника :</label>
                  <Field
                    type="text"
                    name="id"
                    className={style.inputRead}
                    value={idOfficer}
                    onChange={(e) => setIdOfficer(e.target.value)}
                  />
                </div>

                <br />
                <div className={style.dataInput}>
                  <label>Одобрить сотрудника:</label>
                  <Field
                    type="checkbox"
                    name="checkApplo"
                    className={style.input}
                    checked={checkValue}
                    onChange={(e) => setCheckValue(e.target.checked)}
                  ></Field>
                </div>

                <br />
                {/* <div className={style.dataInput}>
                  <label>Номер лицензии :</label>
                  <Field
                    type="text"
                    name="licenseNumber"
                    className={style.input}
                    value={licenseNumberValue}
                    onChange={(e) => setLicenseNumberValue(e.target.value)}
                  />
                </div>

                <ErrorMessage
                  name="licenseNumber"
                  component="div"
                  className={style.error}
                />
                <br />
                <div className={style.dataInput}>
                  <label>Ф.И.О. :</label>
                  <Field
                    type="text"
                    name="ownerFullName"
                    className={style.input}
                    value={ownerFullNameValue}
                    onChange={(e) => setOwnerFullNameValue(e.target.value)}
                  />
                </div>

                <ErrorMessage
                  name="ownerFullName"
                  component="div"
                  className={style.error}
                />

                <br />
                <div className={style.dataInput}>
                  <label>Тип :</label>
                  <Field
                    as="select"
                    name="typeVelo"
                    className={style.input}
                    value={typeValue}
                    onChange={(e) => setTypeValue(e.target.value)}
                  >
                    <option value="general">general</option>
                    <option value="sport">sport</option>
                  </Field>
                </div>

                <ErrorMessage
                  name="type"
                  component="div"
                  className={style.error}
                />

                <br />
                <div className={style.dataInput}>
                  <label>Цвет :</label>
                  <Field
                    type="text"
                    name="color"
                    className={style.input}
                    value={userDetail.color}
                    onChange={(e) => setColorValue(e.target.value)}
                  />
                </div>

                <ErrorMessage
                  name="color"
                  component="div"
                  className={style.error}
                />

                <br />
                <div className={style.dataInput}>
                  <label>Дата :</label>
                  <Field
                    type="text"
                    name="date"
                    className={style.input}
                    value={userDetail.date}
                    onChange={(e) => setDateValue(e.target.value)}
                  />
                </div>

                <ErrorMessage
                  name="date"
                  component="div"
                  className={style.error}
                />
                <br />
                <div className={style.dataInput}>
                  <label>Сотрудник :</label>
                  <Field
                    type="text"
                    name="officer"
                    className={style.input}
                    value={userDetail.officer}
                  />
                </div>

                <ErrorMessage
                  name="officer"
                  component="div"
                  className={style.error}
                />
                <br />
                <div className={style.dataInput}>
                  <label>Описание :</label>
                  <Field
                    type="text"
                    name="description"
                    className={style.input}
                    value={userDetail.description}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                  />
                </div>

                <ErrorMessage
                  name="description"
                  component="div"
                  className={style.error}
                />
                <br />
                <div className={style.dataInput}>
                  <label>Комментарий :</label>
                  <Field
                    className={style.textarea}
                    type="text"
                    name="resolution"
                    value={userDetail.resolution}
                    onChange={(e) => {
                      setResolutionValue(e.target.value);
                      handleChange(e);
                    }}
                  />
                </div>

                <ErrorMessage
                  name="resolution"
                  component="div"
                  className={style.error}
                /> */}

                <br />
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
    </div>
  );
};

export default DetailOfficer;
