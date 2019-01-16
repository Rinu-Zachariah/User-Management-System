import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Row, Col, Spin, message } from 'antd';
import NavigationMenu from './components/NavigationMenu/NavigationMenu.js';
import UnauthorizedAccess from './components/UnauthorizedAccess/UnauthorizedAccess.js';

class App extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	loading: false,
			authorizedAccess: true
    };
    // this.validateUsernameAuthorization = this.validateUsernameAuthorization.bind(this);
	}

	componentWillMount() {
    var state = this.state;
    axios.defaults.baseURL = process.env.REACT_APP_BASEURL;  //must vary depending on ENVIRONMENTS
    axios.defaults.headers = {
      'IV_USER':'Test USER',
      'IV_USER_L':'Test USER',
      'MAIL':'test_user@mail.com',
    };
    message.config({ duration: 3 });
    // axios({	
    //  		url: 'authenticate',
    //  		method: 'GET'
    // })
    // .then(response => {
    //   axios.defaults.headers['Authenticate'] = response.data.authenticate;
    //   axios({ 
    //     url: 'users/is_valid',
    //     method: 'GET'
    //  	}).then(response => {
    //  		this.validateUsernameAuthorization(response.data.is_valid);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

 //  validateUsernameAuthorization = (valid) => {
	// 	let state = this.state;
	// 	if (valid) {	
	//   	state.authorizedAccess = true;
	//   }
	//   state.loading = false;
 // 		this.setState(state);
	// }

  render() {
  	let state = this.state;
    return (
      <div className="App">
      	{!state.loading ? 
      		<span>
		      	{state.authorizedAccess ?
		        	<NavigationMenu children={this.props.children}/>
		        	:
		        	<UnauthorizedAccess />
		      	}
	      	</span>
	      	: 
	      	<Row className="loader-row">
	      		<Col>
	      			<Spin size="large" tip="Loading..." />
      			</Col>
  				</Row>
      	}
      </div>
    );
  }
}

export default App;
