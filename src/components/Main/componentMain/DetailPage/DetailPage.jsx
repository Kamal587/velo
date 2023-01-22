import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./DetailPage.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import $api from "../../../API/serverAnswer";

const DetailPage = ({ inputDis, setInputDis }) => {
  const token = useSelector((state) => state.user.token);
  const userDetail = useSelector((state) => state.detail.link);
  const [officers, setOfficers] = useState();

  const navigate = useNavigate();
  const [licenseNumberValue, setLicenseNumberValue] = useState(
    userDetail.licenseNumber
  );
  const [resolutionValue, setResolutionValue] = useState(userDetail.resolution);

  const [colorValue, setColorValue] = useState(userDetail.color);
  const [dateValue, setDateValue] = useState(userDetail.date);
  const [descriptionValue, setDescriptionValue] = useState(
    userDetail.description
  );
  const [statusValue, setStatusValue] = useState(userDetail.status);
  const [typeValue, setTypeValue] = useState(userDetail.type);
  const [ownerFullNameValue, setOwnerFullNameValue] = useState(
    userDetail.ownerFullName
  );

  console.log(userDetail);
  // const officerApproved =
  //   officers && officers.filter((officer) => officer.approved);
  // console.log(officerApproved);
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
        fetch(
          "https://sf-final-project-be.herokuapp.com/api/officers/",
          options
        )
          .then((response) => response.json())
          .then((result) => setOfficers(result.officers));
    } catch (e) {
      console.log(e.response);
    } finally {
    }
  }, []);
  console.log(officers);
  useEffect(() => {
    !userDetail && navigate("/");
  }, []);

  useEffect(() => {
    if (resolutionValue && resolutionValue.length > 0) {
      setInputDis(false);
    } else if (!resolutionValue || resolutionValue.length === 0) {
      setInputDis(true);
    }
  }, [resolutionValue]);

  const authHandler = async (values) => {
    console.log("123");
    const payload = {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },

      licenseNumber: licenseNumberValue,
      ownerFullName: ownerFullNameValue,
      type: typeValue,
      color: colorValue,
      date: dateValue,
      officer: values.officer,
      description: descriptionValue,
      resolution: resolutionValue,
    };

    try {
      console.log(payload);
      console.log(ownerFullNameValue);
      const response = await $api.put(
        `https://sf-final-project-be.herokuapp.com/api/cases/${userDetail._id}`,

        payload
      );
    } catch (e) {
      console.log(e);
      const error = e.response.data.message;
    } finally {
      navigate("/sms");
    }
  };

  const validationSchema = Yup.object({
    resolution: Yup.string().required("Required"),
  });
  return (
    <div>
      <div className={style.root}>
        <div className={style.regist}>
          <Formik
            initialValues={{
              status: "",
              licenseNumber: "",
              ownerFullName: "",
              type: "",
              color: "",
              date: "",
              officer: "",
              description: "",
              resolution: "",
            }}
            validationSchema={validationSchema}
            onSubmit={authHandler}
          >
            {({ isSubmiting, handleChange }) => (
              <Form className={style.form}>
                <h1 className={style.title}>
                  ДЕТАЛЬНАЯ СТРАНИЦА <br /> СООБЩЕНИЯ О КРАЖЕ
                </h1>
                <br />
                <div className={style.dataInput}>
                  <label>Идентификатор клиента :</label>
                  <Field
                    type="text"
                    name="clientId"
                    className={style.inputRead}
                    value={userDetail.clientId}
                    readOnly
                  />
                </div>

                <ErrorMessage
                  name="clientId"
                  component="div"
                  className={style.error}
                />

                <br />
                <div className={style.dataInput}>
                  <label>Дата создания :</label>
                  <Field
                    type="text"
                    name="createdAt"
                    className={style.inputRead}
                    value={userDetail.createdAt}
                    readOnly
                  />
                </div>

                <ErrorMessage
                  name="createdAt"
                  component="div"
                  className={style.error}
                />

                <br />
                <div className={style.dataInput}>
                  <label>Дата обновления :</label>
                  <Field
                    type="text"
                    name="updatedAt"
                    className={style.inputRead}
                    value={userDetail.updatedAt}
                    readOnly
                  />
                </div>

                <ErrorMessage
                  name="updatedAt"
                  component="div"
                  className={style.error}
                />

                <br />
                <div className={style.dataInput}>
                  <label>Статус :</label>
                  <Field
                    as="select"
                    name="typeVelo"
                    className={style.input}
                    onChange={(e) => setStatusValue(e.target.value)}
                  >
                    <option value="new">new</option>
                    <option value="in_progress">in_progress</option>
                    <option value="finish" disabled={Boolean(inputDis)}>
                      finish
                    </option>
                  </Field>
                </div>

                <ErrorMessage
                  name="status"
                  component="div"
                  className={style.error}
                />

                <br />
                <div className={style.dataInput}>
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
                    as="select"
                    name="officer"
                    className={style.input}
                    value={userDetail.officer}
                  >
                    {officers &&
                      officers.map(
                        (officer) =>
                          officer.approved && <option>{officer.email}</option>
                      )}
                  </Field>
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
                />

                <br />
                <button
                  className={style.btn}
                  type={"submit"}
                  disabled={isSubmiting || statusValue !== "finish"}
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

export default DetailPage;
