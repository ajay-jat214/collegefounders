import React,{useState} from 'react';
import {Carousel} from 'antd';
import { Progress,Tooltip } from 'antd';
import { object } from 'joi';

const contentStyle = {
    height: '80vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  
const ImageSlider = (props) => {

    const function1=(object)=>{
        return(
            <div onClick={()=>{callBack(object.state)}}>
              <Tooltip title={object.state+' : '+object.percent+'%'} placement="topLeft">
                <Progress percent={object.percent} style={{cursor:'pointer'}} />
              </Tooltip>
            </div>
        )
    }
    const callBack=(object)=>props.callBack(object);
    const callBack2=(object)=>props.callBack2(object);
    const function2=(object)=>{
        return(
          <div onClick={()=>{callBack2(object.course)}}>
            <Tooltip title={object.course+' : '+object.percent+'%'} placement="topLeft">
              <Progress percent={object.percent} style={{cursor:'pointer'}}/>
            </Tooltip>
          </div>
        )
    }


    //percentage calculations for charts



    let n=props.data.length;
    let state=[],statePercent=[];
    let j=0;

    for(let i=0;i<n;i++){
      if(!state.includes(props.data[i].state))
        state[j++]=props.data[i].state;
    }

    let m=state.length;
    for(let i=0;i<m;i++){
       let value=0;
      for(let k=0;k<n;k++){
        if(state[i]===props.data[k].state)
          value++;
      }
      statePercent[i]={percent:(value/n*100).toFixed(0),state:state[i]};
    }


    let k=0;
    let courses=[],coursesPercent=[];
    for(let i=0;i<n;i++){
      if(!courses.includes(props.data[i].coursesOffered))
        courses[k++]=props.data[i].coursesOffered;
    }

    for(let i=0;i<courses.length;i++){
      let value=0;
     for(let l=0;l<n;l++){
       if(courses[i]===props.data[l].coursesOffered)
         value++;
     }
     coursesPercent[i]={percent:(value/n*100).toFixed(0),course:courses[i]};
   }
   

   //percentage calculations


   
    return (

        <Carousel autoplay >
        <div > 
        <h2>Statewise</h2>
        {
            statePercent.map(function(object,index){return function1(object)})
        }
        </div>
        <div > 
        <h2>Branchwise</h2>
        {
            coursesPercent.map(function(object,index){return function2(object)})
        }
        </div>
      </Carousel>

    );
};

export default ImageSlider;