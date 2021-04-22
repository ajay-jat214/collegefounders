import React from "react";
import { Card, Row, Col, Button } from "antd";
import { Carousel } from "antd";

const CollegeDetails = (props) => {
  const {
    yearFounded,
    coursesOffered,
    studentStrength,
    country,
    state,
    id,
  } = props.collegeData;
  return (
    <Row justify='center'>
      <Col span={24} justify='center'>
        <Card
          hoverable
          title={
            props.collegeData.name + "                       (" + country + ")"
          }
          bordered={false}
          style={{ width: "500px", minHeight: "650px" }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src='https://thumbs.dreamstime.com/z/cheerful-college-students-walking-out-campus-together-posing-outdoors-camera-having-break-classes-free-space-175174081.jpg'
              alt='College'
              width='250px'
              height='250px'
              style={{ borderRadius: "100%", alignSelf: "center" }}
            />
            <div
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              ESTD.
            </div>
            <p>{yearFounded}</p>
            <div
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              State
            </div>
            <p>{state}</p>
            <div
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Community Strength
            </div>
            <p>{studentStrength}</p>
            <div
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "8px",
              }}
            >
              Courses Offered
            </div>
            <p
              style={{
                display: "flex",
                flex: "column",
                flexWrap: "wrap",
                OverflowX: "scroll",
              }}
            >
              {coursesOffered && (
                <Button
                  key={id}
                  type='primary'
                  style={{
                    padding: "auto",
                    margin: "auto",
                    overflow: "hidden",
                  }}
                >
                  {coursesOffered}
                </Button>
              )}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              type='primary'
              style={{
                padding: "auto",
                margin: "auto",
                background: "#FF3333",
                border: "none",
              }}
              onClick={() => props.showStudents(id)}
            >
              Student Community
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default CollegeDetails;
