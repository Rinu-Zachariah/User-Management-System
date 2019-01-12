import React from 'react';
import Divider from './Divider';
import { shallow, mount, render } from 'enzyme';

describe('Divider', () => {

  describe('Render component depending on availability of prop: "text"', () => {
    const wrapper = shallow(<Divider />);
    
    it('should render Divider without any prop "text"', () => {
      expect(wrapper.contains(<div className="ant-divider ant-divider-horizontal"></div>)).toBe(true);
      expect(wrapper.contains(<div className="ant-divider ant-divider-horizontal"> Some text without prop </div>)).toBe(false);
    });

    it('should render Divider with the text provided as a prop', () => {
      expect(shallow(<Divider text={"Testing Divider"}/>).contains(<div className="ant-divider ant-divider-horizontal ant-divider-with-text"> <span className="ant-divider-inner-text"> Testing Divider </span> </div>))
      .toBe(true);
      expect(wrapper.contains(<div className="ant-divider ant-divider-horizontal ant-divider-with-text"> <span className="ant-divider-inner-text"> Testing Divider </span> </div>))
      .toBe(false);
    });

  });

});
