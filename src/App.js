import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import MainTable from './components/MainTable';
import NavMenu from './components/NavMenu';

import './App.css';

const theme = createTheme({
	palette: {
		mode: 'dark'
	}
});

function App() {
	const [show, setShow] = useState(false);

	const clickHandler = () => {
		setShow(prevState => !prevState);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<NavMenu isOpen={show} clickProps={clickHandler} />
				<Button onClick={clickHandler} variant="contained" className="topMenuTriggerButton">
					Navigation Menu
				</Button>

				<MainTable className="someClassName" />
			</div>
		</ThemeProvider>
	);
}

export default App;
