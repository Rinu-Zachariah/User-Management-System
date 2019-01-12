import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Row, Col, message } from 'antd';
import GroupModal from './GroupModal';
import FormData from 'form-data';
import { shallow, mount, render } from 'enzyme';

const FormItem = Form.Item;

describe('GroupModal', () => {

  it('should render GroupModal elements', () => {
    const wrapper = mount(<GroupModal />);
    expect(wrapper.exists()).toBe(true);  
    wrapper.unmount();
  });
});
