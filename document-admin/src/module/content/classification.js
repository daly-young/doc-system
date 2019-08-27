import React from 'react'
import { Layout, Button, Table, Pagination } from 'antd';
import '../../assets/style/content.scss'

const { Content } = Layout;

const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '文章名称',
  dataIndex: 'name',
}, {
  title: '创建日期',
  dataIndex: 'createTime',
}, {
  title: '创建人',
  dataIndex: 'creator',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: i,
    name: `Edward King ${i}`,
    createTime: '2019-10-10',
    creator: 'Daly',
  });
}


function onChange(pageNumber) {
  console.log(pageNumber)
}

class TagContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Content className="adminContent">
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <Button
            type="danger"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            delete
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
        <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={onChange} />
      </Content >
    )
  }
}

export default TagContent