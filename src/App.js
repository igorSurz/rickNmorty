import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Button from '@mui/material/Button';
import AppContextWrapper from './context/AppContextWrapper';
import MainTable from './components/MainTable';
import NavMenu from './components/NavMenu';
import ChartView from './components/ChartView';

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
		<AppContextWrapper>
			<ThemeProvider theme={theme}>
				<div className="App">
					<Button
						onClick={clickHandler}
						variant="contained"
						className="topMenuTriggerButton">
						Navigation Menu
					</Button>
					<BrowserRouter>
						<NavMenu isOpen={show} clickProps={clickHandler} />
						<Routes>
							<Route path="/" element={<MainTable className="someClassName" />} />
							<Route path="/chart" element={<ChartView />} />
						</Routes>
					</BrowserRouter>
				</div>
			</ThemeProvider>
		</AppContextWrapper>
	);
}

export default App;
