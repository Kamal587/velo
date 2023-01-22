import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";

import { format } from "date-fns";
import "./Sms.css";
import del2 from "./../../../../assets/images/del2.png";
import { useNavigate } from "react-router-dom";
import { setDetail } from "../../../../store/sliceDetail";
import $api from "../../../API/serverAnswer";
import axios from "axios";

const URL = "https://sf-final-project-be.herokuapp.com/api/cases/";
const URLDelete = "https://sf-final-project-be.herokuapp.com/api/cases/";

const Sms = () => {
  const token = useSelector((state) => state.user.token);
  const userDetail = useSelector((state) => state.detail.link);
  const [data, setData] = useState([]);
  const [test, setTest] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteRow = (tableProps) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    $api
      .delete(URLDelete + `${tableProps.value}`, options)
      .then((response) => response.json())
      .then((result) => console.log(result));
    setTest(false);
    console.log(test);
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
        fetch(URL, options)
          .then((response) => response.json())
          .then((result) => setData(result.data));
      setTest(true);
      // response.data && setData(response.data);
      // console.log(response.data);
    } catch (e) {
      console.log(e.response);
    } finally {
    }
  }, [test]);

  const COLUMNS = [
    {
      Header: "Дата",

      accessor: "createdAt",
      disableFilters: true,
      sticky: "left",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Ф.И.О.",

      accessor: "ownerFullName",
      sticky: "left",
    },
    {
      Header: "Модель",

      accessor: "type",
      sticky: "left",
    },
    {
      Header: "Цвет",

      accessor: "Цвет",
    },
    {
      Header: "Delete",
      id: "_id",
      accessor: "_id",

      Cell: (tableProps) => (
        <img
          src={del2}
          className="delete"
          onClick={() => deleteRow(tableProps)}
        ></img>
      ),
    },
  ];

  const hClick = (link) => {
    dispatch(
      setDetail({
        link: link.original,
      })
    );
    navigate(`/detailPage/${userDetail._id}`);
  };

  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
      {token ? (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr onDoubleClick={() => hClick(row)} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="wrap">
          <div className="officerText">
            Сообщения о всех кражах доступны только авторизованным
            пользователям...{" "}
          </div>
          <div className="text">
            <p>
              В настоящее время с каждым годом растет количество владельцев
              велосипедов. К сожалению, вместе с этим растет и криминальный
              интерес к этому средству передвижения.
            </p>
            <p>
              {" "}
              Велосипед – весьма ценное и, при этом, зачастую небрежно хранимое
              имущество. Этой небрежностью и халатностью пользуются
              злоумышленники. Велосипеды крадут либо с целью перепродажи, либо
              из хулиганских побуждений. Для велосипедиста потеря двухколесного
              друга – событие неприятное и обидное. Стоимость некоторых байков
              может превышать и тысячу долларов. Хочется отметить, что зачастую
              отдельные граждане достаточно легкомысленно относятся к
              сохранности своего имущества, оставляют его без присмотра, чем и
              пользуются злоумышленники.
            </p>
            <p>
              При наступлении весенне-летнего сезона, хочется сказать, что в
              этот период всегда повышается популярность лёгкого двухколёсного
              транспорта, использование которого не требует специальной
              подготовки, наличия при себе документов. Велосипеды, наряду с
              телефонами и кошельками, традиционно наиболее подвержены
              преступным посягательствам. Особенно в настоящее время, в связи с
              повышением их стоимости. В основном кражи велосипедов совершаются
              с целью дальнейшей их перепродажи.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Sms;
