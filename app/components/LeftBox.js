'use client'

import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import Styles from '../css/leftBox.moudule.css'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('分类管理', '1', <PieChartOutlined />),
  getItem('文章管理', '2', <DesktopOutlined />),
];
const LeftBox = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const [nowKey, setKey] = useState('')

  const menuSelect = (e) => {
    setKey(e.key)
    console.log(e.key)
    props.sendKey(e.key)
  }
  return (
    <div
      style={{
        width: 256,
        height: '100vh',
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={menuSelect}
      />
    </div>
  );
};
export default LeftBox;