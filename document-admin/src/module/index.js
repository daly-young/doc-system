import React from 'react';
import { Layout } from 'antd';
import AdminHeader from './header'
import AdminFooter from './footer'
import AdminSider from './sidebar'
import AdminContent from './content/index'
import 'antd/dist/antd.css'

class AdminIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      cateIndex: 0
    }
    this.selectCate = this.selectCate.bind(this)
  }
  // 存储选择类别
  selectCate(i) {
    this.setState({ 'cateIndex': i })
    console.log(i)
  }

  render() {
    return (
      <div id="docAdmin">
        <AdminHeader />
        <Layout className="layout">
          <AdminSider selectCate={this.selectCate} />
          <AdminContent cateIndex={this.state.cateIndex} />
        </Layout>
        <AdminFooter />
      </div >
    )
  }
}

export default AdminIndex