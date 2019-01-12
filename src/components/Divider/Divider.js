/** 
	This component is is similar to antd's Divider
	If propText is supplied, it will render the text
	at the center.
**/

import React, { Component } from 'react';
import './Divider.css';

class Divider extends Component {
  render() {
  	let propText = this.props.text;
    return (
    	<span>
	    	{ propText ? 
		      	<div className="ant-divider ant-divider-horizontal ant-divider-with-text"> <span className="ant-divider-inner-text"> { propText } </span> </div> 
		    	:
		    	<div className="ant-divider ant-divider-horizontal"></div>
	    	}
    	</span>
    );
  }
}

export default Divider;
