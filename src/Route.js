import React from 'react';
import {Route,IndexRoute} from 'react-router';
import { HashRouter } from 'react-router-dom';
import App from './App';
import UserDetails from './components/UserDetails/UserDetails.js';
import Footer from './components/Footer/Footer.js';

export default(
	<HashRouter>
		 <Route exact path="/" component={App}>
		   <IndexRoute component={UserDetails} />
		   <Route path="UserDetails" component={UserDetails} />
		 </Route>
	</HashRouter>
);