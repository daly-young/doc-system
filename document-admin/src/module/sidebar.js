import React from 'react'
import { Layout, Menu } from 'antd';
import axios from 'axios';
import '../assets/style/sidebar.scss'
const { Sider } = Layout;
class AdminSider extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [{
        name: '文章管理'
      }, {
        name: '目录管理'
      }, {
        name: '标签'
      }, {
        name: '分类'
      }, {
        name: '用户管理'
      }]
    }
  }
  fetchData() {
    axios.get('').then((data) => {

    }).catch((err) => {

    })
  }

  render() {
    let { selectCate } = this.props
    return (
      <Sider width={200} className="adminSider">
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
        >
          {this.state.list.map((item, index) =>
            <Menu.Item key={index.toString()}
              onClick={e => selectCate(e.key)}>
              {item.name}
            </Menu.Item>
          )}
        </Menu>
      </Sider >
    )
  }
}

export default AdminSider