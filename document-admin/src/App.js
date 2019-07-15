import React from 'react';
import { Layout } from 'antd';
import AdminHeader from './module/header'
import AdminFooter from './module/footer'
import AdminSider from './module/sidebar'
import AdminContent from './module/content'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <AdminHeader />
      <Layout className="layout">
        <AdminSider />
        <AdminContent />
      </Layout>
      <AdminFooter />
    </div>
  );
}

export default App;
