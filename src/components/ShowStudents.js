import React,{useState,useEffect} from 'react';
import { Table, Tag, Radio, Space } from 'antd';
const axios = require('axios');

const columns = [
  {
    title: '#ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'College_ID',
    dataIndex: 'collegeId',
    key: 'collegeid',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Batch_Year',
    dataIndex: 'batch',
    key: 'batch',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Skills',
    key: 'skills',
    dataIndex: 'skills',
    render: skills => (
      <span>
  


            <Tag  key={skills}>
              {skills.toUpperCase()}
            </Tag>
    

      </span>
    ),
  },
];


const ShowStudents = (props) => {
  const [Students,setStudents]=useState([]);
  useEffect(()=>{
    axios.post('https://gifted-bardeen-33b715.netlify.app/studentData', {
      collegeId:props.collegeId
    })
    .then(function (response) {
      console.log(response);
      setStudents(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    // fetch("http://localhost:3001/studentData", {
    //   method: "post",
    //   mode: "no-cors",
    //   headers: { "Authentication": "Content-Type:application/json","Accept": "application/json" },
    //   body: JSON.stringify({collegeId:props.collegeId}),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {setStudents(data.data);})
    //   .catch((err) => console.log(err));
  },[],[,props.collegeId])

    const [top,setTop]=useState('topLeft');
    const [bottom,setBottom]=useState('bottomRight');
    let data=Students.filter((object,index)=> object.collegeId===props.collegeId)

    return (
        <div>
            <div>
                <Table
                columns={columns}
                pagination={{ position: [bottom] }}
                dataSource={data}
                />
            </div>
        </div>
    );
};

export default ShowStudents;