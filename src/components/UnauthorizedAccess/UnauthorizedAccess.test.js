import React from 'react';
import UnauthorizedAccess from './UnauthorizedAccess';
import { shallow, mount, render } from 'enzyme';

describe('UnauthorizedAccess', () => {

  it('should render UnauthorizedAccess text properly without crashing', () => {
    const wrapper = shallow(<UnauthorizedAccess />);
    expect(wrapper.exists()).toBe(true);    
    expect(wrapper.text()).toBe("You are not authorized to access this application. Please contact admin.");
  });

});
