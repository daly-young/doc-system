import React from 'react'
import { Layout, Menu } from 'antd';
import '../assets/style/sidebar.scss'
const { Sider } = Layout;
class AdminSider extends React.Component {
  render() {
    return (
      <Sider width={200} className="adminSider">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1">文章管理</Menu.Item>
          <Menu.Item key="2">目录管理</Menu.Item>
          <Menu.Item key="3">标签</Menu.Item>
          <Menu.Item key="4">分类</Menu.Item>
          <Menu.Item key="5">用户管理</Menu.Item>
        </Menu>
      </Sider >
    )
  }
}

export default AdminSider