import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavigationMenu from './components/NavigationMenu/NavigationMenu.js';
import UnauthorizedAccess from './components/UnauthorizedAccess/UnauthorizedAccess.js';
import { Row, Col, Spin } from 'antd';
import { shallow, mount, render } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


describe('App', () => {

  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);  // This sets the mock adapter on the default instance
  });

  beforeEach(() => {
    mock.reset();
    mock.onGet('authenticate').reply(200, {authenticate: true});
  });

  afterAll(() => {
    mock.restore; // Restore original 
  })

  it('should render the loading spinner initially, if loading state is set to true(default)', () => {
    mock.onGet('users/is_valid').reply(200, {is_valid: true});
    expect(shallow(<App />).contains(
      <Row className="loader-row">
        <Col>
          <Spin size="large" tip="Loading..." />
        </Col>
      </Row>))
    .toBe(true);
  });

  it('should render the NavigationMenu component for valid user', (done) => {
    mock.onGet('users/is_valid').reply(200, {is_valid: true})
    const wrapper = shallow(<App/>);
    setTimeout(() => {
      expect(wrapper.update().contains(<NavigationMenu/>)).toBe(true);
      expect(wrapper.update().contains(<UnauthorizedAccess/>)).toBe(false);
      wrapper.unmount();
      done();
     }, 0);
  });

  it('should render UnauthorizedAccess component for the invalid user', (done) => {
    mock.onGet('users/is_valid').reply(200, {is_valid: false});
    const wrapper = shallow(<App/>);
    setTimeout(() => {
      expect(wrapper.update().contains(<UnauthorizedAccess/>)).toBe(true);
      expect(wrapper.update().contains(<NavigationMenu/>)).toBe(false);
      wrapper.unmount();
      done();
     }, 0);
  });
});