import React, { forwardRef, useRef } from "react";
import { Layout, Menu, Row, Col } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const SideBar = forwardRef(({ pageLocation, mode }, ref) => {
  const { Sider } = Layout;

  return (
    <Sider
      defaultCollapsed={true}
      width={150}
      style={{
        overflow: "auto",
        height: "100%",
        position: "fixed",
        left: 0,
        zIndex: 1000,
      }}
    >
      <div className='logo' />
      <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
        <Menu.Item
          key='1'
          icon={<SearchOutlined />}
          onClick={() => {
            mode === "CollegeList"
              ? pageLocation("search")
              : console.log("no searchbar");
          }}
        >
          Search Institue
        </Menu.Item>
        <Menu.Item
          key='2'
          icon={<DesktopOutlined />}
          onClick={() => pageLocation("college")}
        >
          College
        </Menu.Item>
        <Menu.Item
          key='3'
          icon={<PieChartOutlined />}
          onClick={() => pageLocation("chart")}
        >
          Chart
        </Menu.Item>
      </Menu>
    </Sider>
  );
});

export default SideBar;
