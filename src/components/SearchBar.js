import React from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchBar = (props) => {
    const onSearch=(e)=>{
        props.onSearch(e.target.value);
    }
    return (
     <Space direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onChange={onSearch}
        />
      </Space>
    );
};

export default SearchBar;