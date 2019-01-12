import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Table, message, Popconfirm, Input, Tabs, Select, Icon  } from 'antd';
import './UserDetails.css';
import GroupModal from '../ModalForm/GroupModal';
import ModalPopUp from '../ModalForm/ModalPopUp';
import Search from '../Search/Search';
import Divider from '../Divider/Divider';

const { TextArea } = Input;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const EditableCellTextArea = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <TextArea rows={4}  value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
const EditableCellSelect = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Select
          showSearch
          className="editableCellSelectCssClass"
          placeholder= {value}
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={e => onChange(e)}
        >
          <Option value="G1">G1</Option>
          <Option value="G2">G2</Option>
          <Option value="G3">G3</Option>
        </Select>
      : value
    }
  </div>
);
const EditableMultiSelect = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.changeUserHandling}
        style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select> 
      : value
    }
  </div>
);

class UserDetails extends Component {
  constructor() {
    super();
    this.groupDelete = this.groupDelete.bind(this);
    this.userDelete = this.userDelete.bind(this);
    this.getCallback = this.getCallback.bind(this);
  }
  componentDidMount() {
    let state = this.state;
    state.loading = true;
    axios.all([
      axios.get('/users'),
      axios.get('/groups')
    ]).then(response => {
      state.userData = response[0].data;
      state.groupData = response[1].data;
      state.loading = false;
      this.setState(state);
    })
    .catch(error => {
      message.error('Something went wrong, please refresh and try again');
    })
  }

  state = {
    loading: false, //for displaying the loading icon, and disabling the form items
    file: '',
    groupData: [],
    userData: [],
    groupDataConfiguration: [{
      title: 'Name',
      dataIndex: 'name',
      width: 250,
      sorter: (a, b) => {
        let assetA = a.asset.toUpperCase();
        let assetB = b.asset.toUpperCase();
        if (assetA < assetB) {
          return -1;
        }
        if (assetA > assetB) {
          return 1;
        }
        return 0;
      },
      render: (text, record) => this.renderGroupCols(text, record, 'name')
    },{
      title: 'ID',
      dataIndex: 'id',
      width: 180,
      render: (text, record) => this.renderGroupCols(text, record, 'id')
    },{
      title: 'Users',
      dataIndex: 'users',
      width: 180,
      render: (text, record) => this.renderMultiSelect(text, record, 'users')
    }, {
      title: 'Action',
      dataIndex: 'operation',
      width: 180,
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.saveGroup(record.id)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancelGroup(record.id)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.editGroup(record.id)}>Edit</a>
            }
            <Popconfirm title="Sure to delete?" onConfirm={() => this.groupDelete(record.id)}>
              <a><Icon type="delete" /></a>
            </Popconfirm>
          </div>
        );
      },
    }],
    UserdataCheckTable: [{
      title: 'Name',
      dataIndex: 'name',
      width: 250,
      sorter: (a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
      render: (text, record) => this.renderColumns(text, record, 'name')
    }, {
      title: 'Group',
      dataIndex: 'group',
      width: 250,
      render: (text, record) => this.renderSelectColumn(text, record, 'group'),
      filters: this.state.userData.map((arr, index) => ({
        text: arr.group,
        value: arr.group,
      }))),
      onFilter: (value, record) => record.group.indexOf(value) === 0,
    }, {
      title: 'Address',
      dataIndex: 'address',
      width: 350,
      render: (text, record) => this.renderColumns(text, record, 'address')
    }, {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      render: (text, record) => this.renderColumns(text, record, 'email')
    }, {
      title: 'Action',
      dataIndex: 'operation',
      width: 100,
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.id)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.id)}>Edit</a>
            }
             <Popconfirm title="Sure to delete?" onConfirm={() => this.userDelete(record.id)}>
              <a><Icon type="delete" /></a>
            </Popconfirm>
          </div>
        );
      },
    }]
  };

  cacheData = this.state.userData.map(item => ({ ...item }));
  cacheDataGroup = this.state.groupData.map(item => ({ ...item }));
  save = (id) => {
    const newData = [...this.state.userData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      axios({
        url: 'userAddUpdate/'+target.id,
        method: 'PUT',
        data: target
      }).then(response => {
        delete target.editable;
        this.setState({ userData: newData });
        message.success('User updated successfully');
      })
      .catch(error => {
        message.error('Something went wrong while saving user, please try again');
      });
    }
  }
  cancel = (id) => {
    const newData = [...this.state.userData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
      delete target.editable;
      this.setState({ userData: newData });
    }
  }
  saveGroup = (id) => {
    const newData = [...this.state.groupData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      axios({
        url: 'groupAddUpdate/'+target.id,
        method: 'PUT',
        data: dataForm
      }).then(response => {
        delete target.editable;
        this.setState({ groupData: newData });
        message.success('Group updated successfully');
      })
      .catch(error => {
        message.error('Something went wrong while saving group, please try again');
      });
    }
  }
  cancelGroup = (id) => {
    const newData = [...this.state.groupData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheDataGroup.filter(item => id === item.id)[0]);
      delete target.editable;
      this.setState({ groupData: newData });
    }
  }
  renderColumns = (text, record, column) => {
    return (
      <EditableCellTextArea
      editable={record.editable}
      value={text}
      onChange={value => this.handleChange(value, record.id, column)} />
    );
  }
  renderGroupCols = (text, record, column) => {
    return (
      <EditableCellTextArea
      editable={record.editable}
      value={text}
      onChange={value => this.handleChangeGroup(value, record.id, column)} />
    );
  }
  renderSelectColumn = (text, record, column) => {
    return (
      <EditableCellSelect
      editable={record.editable}
      value={text}
      onChange={value => this.handleChange(value, record.id, column)} />
    );
  }
  renderMultiSelect = (text, record, column) => {
    return (
      <EditableMultiSelect
      editable={record.editable}
      value={text}
      onChange={value => this.handleChange(value, record.id, column)} />
    );
  }  
  handleChange(value, id, column) {
    const newData = [...this.state.userData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ userData: newData });
    }
  }
  handleChangeGroup(value, id, column) {
    const newData = [...this.state.groupData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ groupData: newData });
    }
  }
  editGroup = (id) => {
    const newData = [...this.state.groupData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ groupData: newData });
    }
  }
  edit = (id) => {
    const newData = [...this.state.userData];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ userData: newData });
    }
  }
  groupDelete = (id) => {
    const groupData = [...this.state.groupData];
    const target = groupData.filter(item => id === item.id)[0];
    if (target && (target.users === "" || target.users === undefined)) {
      axios({
        url: 'groupDelete/'+target.id,
        method: 'DELETE',
        data: target.id
      }).then(response => {
        this.setState({ groupData: groupData.filter(item => item.id !== id) });
        message.success('Deleted Group successfully');
      })
      .catch(error => {
        message.error('Something went wrong while deleting group, please try again');
      });
    }
    else{
      message.warning('Please delete all users before you delete group');
    }
  }
  userDelete = (id) => {
    const userData = [...this.state.userData];
    const target = userData.filter(item => id === item.id)[0];
    if (target) {
      axios({
        url: 'userDelete/'+target.id,
        method: 'DELETE',
        data: target.id
      }).then(response => {
        this.setState({ userData: userData.filter(item => item.id !== id) });
        message.success('Deleted user successfully');
      })
      .catch(error => {
        message.error('Something went wrong while deleting user, please try again');
      });
    }
  }
  getCallback = (dataFromChild, secondParam) => {
    if(dataFromChild){
      if(secondParam === "GroupDataValue"){
        axios({
          url: 'groups',
          method: 'GET'
        }).then(response => {
          this.state.groupData = response.data;
          this.setState(this.state);
        })
        .catch(error => {
          console.log(error);
          message.error('Something went wrong, please refresh and try again');
        });
      }
      else if(secondParam === "UserDataValue"){
        axios({
          url: 'users',
          method: 'GET'
        }).then(response => {
          this.state.userData = response.data;
          this.setState(this.state);
        })
        .catch(error => {
          console.log(error);
          message.error('Something went wrong, please refresh and try again');
        });
      }
    } 
  }  
  render() {
    let state = this.state;

    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="User Data" key="1">
            <Form onSubmit={this.handleSubmit}>
              <Row className="content" type="flex" align="middle" justify="space-around">
                <Col className="column-element-padding">
                  <FormItem>
                    <ModalPopUp getCallToBeInitialized={this.getCallback} />
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Divider text={'User Data'}/>
            <Row className="content" type="flex" align="middle" justify="space-around">
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}} md={{span: 8, offset: 16}}>
                <Search valuesData=state.userData />
              </Col>
            </Row>
            <Row className="content">
              <Col>
                <Table
                  bordered={ true }
                  pagination={ false }
                  columns={state.UserdataCheckTable}
                  dataSource={state.userData}
                  rowKey="key"
                  loading={state.loading}
                  scroll={{ y: 360 }} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Group Data" key="2">
            <Form onSubmit={this.handleSubmit}>
              <Row className="content" type="flex" align="middle" justify="space-around">
                <Col className="column-element-padding">
                  <FormItem>
                    <GroupModal getCallToBeInitialized={this.getCallback}/>
                  </FormItem>
                </Col>
              </Row>
              <Row className="content" type="flex" align="middle" justify="space-around">
                <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}} md={{span: 8, offset: 16}}>
                  <Search valuesData=state.groupData />
                </Col>
              </Row>
              <Row className="content">
                <Col>
                  <Table
                    bordered={ true }
                    pagination={ false }
                    columns={state.groupDataConfiguration}
                    dataSource={state.groupData}
                    rowKey="group_id"
                    loading={state.loading}
                    scroll={{ x: 2500, y: 360 }} />
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Form.create()(UserDetails);