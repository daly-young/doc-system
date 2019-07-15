import React from 'react'
import { Layout, Icon } from 'antd';
import '../assets/style/footer.scss'
const { Footer } = Layout;
class AdminFooter extends React.Component {
  render() {
    return (
      <Footer className="adminFooter">
        <Icon type="question-circle-o" />
        有问题请联系 122480667@qq.com
      </Footer >
    )
  }
}

export default AdminFooter