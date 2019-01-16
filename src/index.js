import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import './index.css';
import routes from './Route';

ReactDOM.render(
	<LocaleProvider locale={enUS}>
		<Router routes={routes} />
	</LocaleProvider>, 
	document.getElementById('root')
);
