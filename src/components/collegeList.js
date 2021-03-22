import React,{useState} from 'react';
import { Table,Button } from 'antd';
import { Tag, Space,Tooltip, Breadcrumb } from 'antd';
import {TableOutlined,FilterOutlined} from '@ant-design/icons';
//import './App.css';


const CollegeList = (props) => {
    const columns = [
        {
          title: '#ID',
          dataIndex: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',

          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
        },
        {
          title: 'City',
          dataIndex: 'city',

          filterMultiple: false,
          onFilter: (value, record) => record.city.indexOf(value) === 0,
          sorter: (a, b) => a.city.length - b.city.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'State',
          dataIndex: 'state',
          filters: [],
          filterMultiple: false,
         
          sorter: (a, b) => a.state.length - b.state.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Tags',
          key: 'id',
          dataIndex: 'id',
          render: id => (
            <>

                  <Tag color="green" key={id} onClick={()=>CollegeData(id)} style={{cursor:'pointer'}}>
                    Details
                  </Tag>

              
            </>
          ),
        },
      ];
      

    const onChange=(pagination, filters, sorter, extra) =>{
       
        //console.log('params', pagination, filters, sorter, extra,props.stateFilter);
        setPagination({current:pagination.current})
      } 
      const CollegeData=async (key)=>{
          await props.CollegeDetails(key);
      }
      const [pagination,setPagination]=useState({current:'1',pageSize:'8'});
      const [stateFilter,setStateFilter]=useState({text:'',value:''});

      return (
        <div>
          <Breadcrumb>
          <>{
            (props.stateFilter.length||props.courseFilter.length)
            ?
          <>
          <Breadcrumb.Item style={{cursor:'pointer',fontSize:'20px'}}>
          <FilterOutlined style={{fontSize:'25px'}}/>
          </Breadcrumb.Item>{
          props.stateFilter.length
          ?
          <span>Statewise </span>
          :
          null
          }
          {
            props.courseFilter.length
            ?
            <span>Branchwise </span>
            :
            null
          }
          </>
          :
          null
          }</>
          </Breadcrumb>
        {
           ( props.stateFilter||props.courseFilter)&&
            <Tooltip title="Reset" placement="topLeft">
                <TableOutlined onClick={props.tableChangeCall} style={{fontSize:'46px',color: 'white',background:"#1890ff",borderRadius:"10px",position:"fixed",bottom:"80px",right:"24px"}}/>
            </Tooltip>
        }
           <Table pagination={pagination} columns={columns} dataSource={props.stateFilter.length?props.data.filter((data,index)=>props.data[index].state.toLowerCase().includes(props.stateFilter.toLowerCase())):(props.courseFilter.length?  props.data.filter((data,index)=>props.data[index].coursesOffered.toLowerCase().includes(props.courseFilter.toLowerCase()))  :  props.data)} onChange={onChange} /> 
        </div>
    );
};

export default CollegeList;