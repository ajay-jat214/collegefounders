import {useState,useRef,useEffect} from 'react';
import { Breadcrumb } from 'antd';
import { Button, Tooltip } from 'antd';
import { HomeOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Layout, Menu, Row, Col } from 'antd';
import CollegeList from './components/collegeList';
import CollegeDetails from './components/CollegeDetails';
import './App.css';
import 'antd/dist/antd.css';
import ImageSlider from './components/ImageSlider';
import Article from './components/Article';
import SideBar from './components/SideBar';
import SearchBar from './components/SearchBar';
import ShowStudents from './components/ShowStudents';
let data1=[];

function App() {
  let datafilter=[];
  const articleRef = useRef();
  const articleRef1 = useRef();
  const articleRef2 = useRef();
  const articleRef3 = useRef();
  const [collegeId,setCollegeId]=useState(0);
  const [dummyData,setDummyData]=useState(data1);
  const [mode, setMode]=useState('CollegeList');
  const [collegeName, setCollegeName]=useState('');
  const [collegeData,setCollegeData]=useState({});
  const [stateFilter,setStateFilter]=useState('');
  const [courseFilter,setCourseFilter]=useState('');
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu; 

  useEffect(()=>{
  
    fetch("https://collegefounders.herokuapp.com/data", {
      method: "post",
      mode: "no-cors",
      headers: { Authentication: "Content-Type:application/json" },
      body: JSON.stringify({collegeId:collegeId}),
    })
      .then((response) => response.json())
      .then((data) => {setDummyData(data.data);data1=data.data;datafilter=data.data;console.log(data)})
      .catch((err) => console.log(err));
  },[],[,collegeId,stateFilter,courseFilter])


  const CollegeDetailsFunction= (key)=>{
    setMode('CollegeData');
    setCollegeId(key);
    for(let i=0;i<dummyData.length;i++){
      if(dummyData[i].id===key){
        setCollegeName(dummyData[i].name);
        setCollegeData(dummyData[i]);
        break;
      }
    }   
  }
  function handleBackClick(){
    articleRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  const tableChangeCall=()=>{
    setStateFilter('');
    setCourseFilter('');
  }
  let datavar='',datavar2='';
  const callBack=(state)=>{
    setCourseFilter('');
    datavar=state;
    setMode('CollegeList');
    setCollegeName('');
    setStateFilter(datavar);
  }
  const callBack2=(course)=>{
    setStateFilter('');
    datavar2=course;
    setMode('CollegeList');
    setCollegeName('');
    setCourseFilter(datavar2);
  }
  const pageLocation=(data)=>{
    if(data==='college')
      articleRef1.current.scrollIntoView({ behavior: 'smooth' });
    if(data==='chart')
      articleRef2.current.scrollIntoView({ behavior: 'smooth' });
    if(data==='search')
      articleRef3.current.scrollIntoView({ behavior: 'smooth' });
  }
  const onSearch=(search)=>{
    //console.log(dummyData[0].name.toLowerCase(),search);
    setDummyData(data1.filter((object,index)=>object.name.toLowerCase().includes(search.toLowerCase())));
  }
  const showStudents=(id)=>{
    setMode('studentsList');
    setCollegeId(id);
  }
  return (
    <div style={{justify:'center',alignItems:'center',fontStyle:'italic'}} ref={articleRef}>
  <Layout style={{ minHeight: '100vh' }}>
        <SideBar pageLocation={pageLocation} mode={mode}/>
        <Breadcrumb>

        <Layout className="site-layout" style={{marginBottom:'50px',marginLeft:'75px'}}>
        
          <Content style={{ margin: '0 16px' }} className="Content">
          <Breadcrumb.Item style={{cursor:'pointer',fontSize:'20px'}}onClick={()=>{setMode('CollegeList');setCollegeName('')}}>
            <HomeOutlined style={{fontSize:'20px'}}/>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{cursor:'pointer',fontSize:'20px'}} onClick={()=>{setMode('CollegeList');setCollegeName('')}}>
            <UserOutlined style={{fontSize:'20px'}}/>
            <span>College List</span>
          </Breadcrumb.Item>
          {
            !collegeName.length
            ?
            <Breadcrumb.Item style={{fontSize:'20px'}}>College</Breadcrumb.Item>
            :
            <Breadcrumb.Item style={{fontSize:'20px'}}>{collegeData.name}</Breadcrumb.Item>
          }
          {mode==="CollegeList"&&<div style={{marginTop:'10px',marginBottom:'15px',textAlign:'center'}} ref={articleRef3}><SearchBar onSearch={(search)=>onSearch(search)} mode={mode}/></div>}
          <Row justify="center" gutter={[20,20]} style={{margin:'auto',marginTop:"10px"}} ref={articleRef1}>
          <Col>{
          mode==="CollegeList"
          ?
            <CollegeList data={dummyData} CollegeDetails={CollegeDetailsFunction} stateFilter={stateFilter} courseFilter={courseFilter} tableChangeCall={tableChangeCall} />
          :
            
              mode === "studentsList"
              ?
              <div style={{marginTop:'15px'}}><ShowStudents collegeId={collegeId}/></div>
              :
              <div style={{marginTop:'15px'}}><CollegeDetails collegeData={collegeData} showStudents={showStudents}/></div>
            
          }
          </Col>
          <Col >
           <div style={{width:'500px',flex:'1'}} ref={articleRef2}>
             <ImageSlider callBack={callBack} callBack2={callBack2} data={dummyData}/>  
           </div>
          </Col>
          </Row>
          </Content>
          <Article  onBackClick={handleBackClick} />
        </Layout>
  </Breadcrumb>
  </Layout>
    </div>
  );
}

export default App;
