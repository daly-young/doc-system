import React from 'react'
import { Layout, Icon, Input, Button } from 'antd';
import '../assets/style/header.scss'
const { Header } = Layout;
class AdminHeader extends React.Component {
  render() {
    return (
      < Header className="adminHeader">
        <span className="adminHeader__logo">Daly-Doc</span>
        <Input addonBefore="关键字" defaultValue="" placeholder="例如: css" className="adminHeader__input" />
        <Button type="primary" icon="search" className="adminHeader__search">Search</Button>
        <div className="adminHeader__user"><Icon type="user" />Daly</div>
      </Header >
    )
  }
}

export default AdminHeader