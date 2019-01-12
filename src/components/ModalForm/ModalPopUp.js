import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Row, Col, message, Select } from 'antd';
import './GroupModal.css';
const FormItem = Form.Item;
const Option = Select.Option;


class ModalPopUp extends Component {
  constructor() {
    super();
    this.addUser = this.addUser.bind(this);
    this.showFormTrue = this.showFormTrue.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }
  state = {
    loading: false,
    visible: false
  };

  showFormTrue(param) {
    if(param === false){
      this.props.form.resetFields();
    }
    this.setState({ visible: param });
  }
  addUser = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setState({ loading: true });
        let addObject = {
          name: values.Name,
          group: values.Group,
          description: values.address,
          url: values.email
        }
        axios({
          url: 'user',
          method: 'POST',
          data: addObject
        }).then(response => {
          this.setState({ loading: false });
          this.showFormTrue(false);
          this.getUserData(true, "UserDataValue");
          message.success('New user added successfully');
        })
        .catch(error => {
          this.setState({ loading: false });
          this.showFormTrue(false);
          this.getUserData(false, "UserDataValue");
          message.error('Something went wrong while adding new user, please try again');
        });
      }
    });
  }

  getUserData = (booleanValue, secondparam) => {
    this.props.getCallToBeInitialized(booleanValue, secondparam);
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={()=> this.showFormTrue(true)}>Add User</Button>
        <Modal
          visible={this.state.visible}
          title="Add New User"
          onCancel={()=> this.showFormTrue(false)}
          footer={[
            null, null,
          ]}
        >
          <Form layout="vertical">
            <Row className="content heightAdjustFormElements" type="flex" align="middle" justify="space-around">
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 11, offset: 1}} md={{span: 24, offset: 0}}>
                <FormItem label=" Name">
                  {getFieldDecorator('Name', {
                    rules: [{ required: true, message: ' Name is required' }],
                  })(
                    <Input placeholder="Enter Name"  />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="content heightAdjustFormElements" type="flex" align="middle" justify="space-around">
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 12, offset: 0}} md={{span: 12, offset: 0}}>
                <FormItem label="Group">
                  {getFieldDecorator('Group', {
                    rules: [{ required: true, message: ' Group is required' }],
                  })(
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Group"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        
                      >
                        <Option value="G1">G1</Option>
                        <Option value="G2">G2</Option>
                        <Option value="G3">SG3</Option>
                      </Select>
                  )}
                </FormItem>
              </Col>
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 11, offset: 1}} md={{span: 12, offset: 0}}>
                <FormItem label="email">
                  {getFieldDecorator('email', {
                    rules: [{type: 'email', message: 'The input is not valid E-mail!'},{ required: true, message: ' Email is required'}],
                  })(
                    <Input placeholder="Enter url" />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row className="content heightAdjustFormElements" type="flex" align="middle" justify="space-around">
              <Col className="column-element-padding" xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}} md={{span: 24, offset: 0}}>
                <FormItem label="Address">
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: ' Address is required' }],
                  })(
                    <Input type="textarea" placeholder="Enter Address" />
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
                      onClick={this.addUser}>
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

export default Form.create()(ModalPopUp);