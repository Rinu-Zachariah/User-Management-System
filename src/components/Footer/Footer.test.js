import React from 'react';
import { Row, Col } from 'antd';
import Footer from './Footer';
import { shallow, mount, render } from 'enzyme';

describe('Footer', () => {

  it('should render Footer text properly without crashing', () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.exists()).toEqual(true);    
  });

});
