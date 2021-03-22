import React,{useState,useEffect} from 'react';
import { Table, Tag, Radio, Space } from 'antd';

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
    fetch("http://localhost:3001/studentData", {
      method: "post",
      headers: { Authentication: "Content-Type:application/json" },
      body: JSON.stringify({collegeId:props.collegeId}),
    })
      .then((response) => response.json())
      .then((data) => {setStudents(data.data);})
      .catch((err) => console.log(err));
  },[props.collegeId],[])

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