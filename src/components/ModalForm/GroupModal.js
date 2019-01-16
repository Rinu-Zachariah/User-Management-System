import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Row, Col, message, Select, Spin } from 'antd';
import './GroupModal.css';
import FormData from 'form-data';
const FormItem = Form.Item;
const Option = Select.Option;
class GroupModal extends Component {
  constructor() {
    super();
    this.addGroup = this.addGroup.bind(this);
    this.showFormTrue = this.showFormTrue.bind(this);
    this.getGroupData = this.getGroupData.bind(this);
    this.lastFetchId = 0;
    this.fetchUser = this.fetchUser.bind(this);
  }

  state = {
    loading: false, //for displaying the loading icon, and disabling the form items
    visible: false,
    data: [],
    fetching: false,
    value: [],
    usernames: []
  };
  showFormTrue(param) {
    if(param === false){
      this.props.form.resetFields();
    }
    this.setState({ visible: param });
  }
  changeUserHandling = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  addGroup = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setState({ loading: true });
        let dataForm = new FormData();
        var venture_image = this.state.file;
        
        dataForm.append('name', values.name);
        dataForm.append('email', values.email);
        dataForm.append('users', this.state.usernames);
        
        axios({
          url: 'userAddUpdate',
          method: 'POST',
          data: dataForm
        }).then(response => {
          this.showFormTrue(false);
          this.setState({ loading: false });
          this.getGroupData(true, "GroupDataValue");
          message.success('Group added successfully');
        })
        .catch(error => {
          this.setState({ loading: false });
          this.showFormTrue(false);
          this.getGroupData(false, "GroupDataValue");
          message.error('Something went wrong while adding new group, please try again');
        });
      }
    });
  }

  fetchUser = (value) => {
    this.lastFetchId += 1;
    var dataFetched = [];
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then((body) => {
      if (fetchId !== this.lastFetchId) {
        return;
      }
      const data = body.results.map(user => ({
        text: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }));
      this.setState({ data, fetching: false });
      dataFetched = data;
    });
    this.setState({ usernames: dataFetched });
  }

  getGroupData = (booleanValue, secondparam) => {
    this.props.getCallToBeInitialized(booleanValue, secondparam);
  }
  
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { fetching, data, value } = this.state;
    
    return (
      <div>
        <Button type="primary" onClick={()=> this.showFormTrue(true)}>Add Group</Button>
        <Modal
          visible={this.state.visible}
          title="Add New Group"
          onCancel={()=> this.showFormTrue(false)}
          footer={[
            null, null,
          ]}
        >
          <Form layout="vertical">
            <Row className="content heightAdjustFormElements" type="flex" align="middle" justify="space-around">
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 11, offset: 1}} md={{span: 12, offset: 0}}>
                <FormItem label=" Name">
                  {getFieldDecorator('name', {
                    validateTrigger: ['onChange', 'onSelect'],
                    rules: [{ required: true, message: ' Name is required' }],
                  })(
                    <Input placeholder="Enter Name"/>
                  )}
                </FormItem>
              </Col>
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 11, offset: 1}} md={{span: 11, offset: 1}}>
                <FormItem label="Email">
                  {getFieldDecorator('email', {
                    validateTrigger: ['onChange', 'onSelect'],
                    rules: [{type: 'email', message: 'The input is not valid E-mail!'},{ required: true, message: ' Email is required'}],
                  })(
                    <Input placeholder="Enter Email" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="content heightAdjustFormElements" type="flex" align="middle" justify="space-around">
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}} md={{span: 24, offset: 0}}>
                <FormItem label={<span>Users</span>} >
                    {getFieldDecorator('users', {
                      rules: [{ 
                      required: true,                  
                      message: 'Please select atleast one user!', 
                      type: 'array' }] 
                    })( 
                     <Select
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
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="content formElementsButtonStyles" type="flex" align="middle" justify="space-around">
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}} md={{span: 7, offset: 7}}>
                <FormItem>
                  <Button 
                      htmlType="submit" 
                      onClick={()=> this.showFormTrue(false)}>
                        Cancel
                  </Button> 
                </FormItem>
              </Col>
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}} md={{span: 10, offset: 0}}>
                <FormItem>
                  <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={this.state.loading}
                      onClick={this.addGroup}>
                        Create
                  </Button> 
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(GroupModal);
