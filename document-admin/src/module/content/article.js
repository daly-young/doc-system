import React from 'react'
import { Layout, Button, Table, Pagination } from 'antd';
// import { getArticles } from '../../assets/js/api'
import '../../assets/style/content.scss'

const { Content } = Layout;
const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '用户名',
  dataIndex: 'name',
}, {
  title: '创建者',
  dataIndex: 'creator',
}, {
  title: '上一次修改时间',
  dataIndex: 'lastModifyTime',
}, {
  title: '上一次修改人',
  dataIndex: 'lastEditor',
}, {
  title: '创建时间',
  dataIndex: 'createTime',
}];

const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    id: i,
    name: `Edward King ${i}`,
    creator: 'Daly',
    lastModifyTime: (new Date()).toLocaleDateString(),
    lastEditor: 'daly2',
    createTime: '2018-10-10 10:00:00'
  });
}

class ArticlesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      total: 20
    }
  }

  // 异步模仿
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

  // table选择
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRows)
    this.setState({ selectedRowKeys });
  }

  onChange = (pageNumber) => {
    console.log(pageNumber)
  }

  render() {
    const { loading, selectedRowKeys, total } = this.state;
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
        {total > 10 &&
          <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={this.onChange} />
        }
      </Content >
    )
  }
}

export default ArticlesContent