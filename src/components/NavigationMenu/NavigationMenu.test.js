import React from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router';
import NavigationMenu from './NavigationMenu.js';
import Footer from '../Footer/Footer.js';
const { Header, Sider, Content } = Layout;
import { shallow, mount, render } from 'enzyme';

describe('NavigationMenu', () => {

  it('should render NavigationMenu without crashing', () => {
    const wrapper = shallow(<NavigationMenu />);
    expect(wrapper.exists()).toBe(true);  
  });

  it('should render Layout with overlay hidden', () => {
    const wrapper = shallow(<NavigationMenu />);
    expect(wrapper.contains(
      <Layout>
        <Header className="header-container">
          <Row className="navigation-heading">
            <Col span={23} offset={1}> User Management System </Col>
          </Row>
        </Header>
        <Content className="content-container">
        </Content>
        <Footer/>
      </Layout>
    )).toBe(true);  
    expect(wrapper.contains(
      <div className="disabled-overlay"></div>
    )).toBe(false);  
  });

  it('should render Layout with an overlay, on toggling menu icon', () => {
    const wrapper = shallow(<NavigationMenu />);
    wrapper.find('.menu-hamburger').simulate('click');
    expect(wrapper.contains(
      <div className="disabled-overlay"></div>
    )).toBe(true);  
  });

});
