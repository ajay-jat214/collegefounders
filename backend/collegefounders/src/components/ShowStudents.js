import React, { useState, useEffect } from "react";
import { Table, Tag, Radio, Space, Spin } from "antd";
const axios = require("axios");

const columns = [
  {
    title: "#ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "College_ID",
    dataIndex: "collegeId",
    key: "collegeid",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Batch_Year",
    dataIndex: "batch",
    key: "batch",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Skills",
    key: "skills",
    dataIndex: "skills",
    render: (skills) => (
      <span>
        <Tag key={skills} style={{ color: "#389e0d" }}>
          {skills}
        </Tag>
      </span>
    ),
  },
];

const ShowStudents = (props) => {
  const [Students, setStudents] = useState([]);
  const [message, setMessage] = useState("willLoad");
  useEffect(
    () => {
      fetch("https://collegefounders.herokuapp.com/studentData", {
        method: "post",
        headers: {
          Authentication: "Content-Type:application/json",
        },
        body: JSON.stringify({ collegeId: props.collegeId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") setMessage("loaded");
          setStudents(data.data);
        })
        .catch((err) => console.log(err));
      // fetch("http://localhost:3001/studentData", {
      //   method: "post",
      //   mode: "no-cors",
      //   headers: {
      //     Authentication: "Content-Type:application/json",
      //     "Cache-Control": "max-age=3600",
      //     Etag: "abc32820jfkdj",
      //   },
      //   body: JSON.stringify({ collegeId: props.collegeId }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setStudents(data.data);
      //   })
      //   .catch((err) => console.log(err));
    },
    [],
    [props]
  );

  const [top, setTop] = useState("topLeft");
  const [bottom, setBottom] = useState("bottomRight");
  let data = Students.filter(
    (object, index) => object.collegeId === props.collegeId
  );

  return (
    <div>
      <div>
        {message === "loaded" ? (
          <Table
            columns={columns}
            pagination={{ pageSize: 20 }}
            dataSource={data}
          />
        ) : (
          <Space size='middle'>
            <Spin size='large' />
          </Space>
        )}
      </div>
    </div>
  );
};

export default ShowStudents;
