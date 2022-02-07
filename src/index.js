import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContextWrapper from './context/AppContextWrapper';

import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<AppContextWrapper>
			<App />
		</AppContextWrapper>
	</React.StrictMode>,
	document.getElementById('root')
);
