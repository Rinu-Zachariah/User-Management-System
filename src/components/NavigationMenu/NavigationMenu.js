import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router';
import './NavigationMenu.css';
import Footer from '../Footer/Footer.js';
const { Header, Sider, Content } = Layout;

class NavigationMenu extends Component {

  state = {
    collapsed: true,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout className="main-container">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Icon
              className="menu-hamburger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              offset = {4}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={'UserDetails'}>
                <Icon type="user" />
                <span>User Details</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {!this.state.collapsed ? <div className="disabled-overlay"></div> : null}
          <Header className="header-container">
            <Row className="navigation-heading">
              <Col span={23} offset={1}> User Management System </Col>
            </Row>
          </Header>
          <Content className="content-container">
            {this.props.children}
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    );
  }
}

export default NavigationMenu;
