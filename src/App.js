import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination, Stack, Button } from '@mui/material';

import MainTable from './components/MainTable';
import NavMenu from './components/NavMenu';
import ChartView from './components/ChartView';
import CardView from './components/CardView';

import { Context } from './context/Context';
import './App.css';

const theme = createTheme({
	palette: {
		mode: 'dark'
	}
});

function App() {
	const { searchData, changeError, gender, status, view } = useContext(Context);

	const [show, setShow] = useState(false);

	// =================================================================
	const [isLoading, setIsLoading] = useState(true);
	const [pageCount, setPageCount] = useState(1);
	const [allChars, setAllChars] = useState('');
	const [characters, setCharacters] = useState('');
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchAllCharacters = async () => {
			let all = Array(42)
				.fill()
				.map((e, i) =>
					axios.get(`https://rickandmortyapi.com/api/character?page=${i + 1}`)
				);

			let data = await Promise.all(all);

			setAllChars(data);
			setPageCount(all.length);
		};
		fetchAllCharacters();
	}, []);

	useEffect(() => {
		const fetchCharacters = async () => {
			if (searchData || gender || status) {
				try {
					const { data } = await axios.get(
						`https://rickandmortyapi.com/api/character?page=${page}&name=${searchData}&gender=${gender}&status=${status}`
					);

					setCharacters(data.results);
					setPageCount(data.info.pages);
				} catch (e) {
					changeError(e.response.data.error);
				}
			}
		};
		fetchCharacters();
		setIsLoading(false);
		// eslint-disable-next-line
	}, [gender, page, searchData, status]);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const clickHandler = () => {
		setPage(1);
		setShow(prevState => !prevState);
	};

	const propsCondition = () => {
		if (searchData || gender || status) {
			return characters;
		} else {
			return (
				allChars.length &&
				allChars.map((e, i) => (i === page - 1 ? Object.values(e.data.results) : null))[
					page - 1
				]
			);
		}
	};
	const propPageCount = () => {
		setPageCount(allChars.length);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Button onClick={clickHandler} variant="contained" className="topMenuTriggerButton">
					Navigation Menu
				</Button>
				<BrowserRouter>
					<NavMenu
						isOpen={show}
						clickProps={clickHandler}
						propPageCount={propPageCount}
					/>
					<Routes>
						<Route
							path="/"
							element={
								view === 'table' ? (
									<MainTable
										isLoading={isLoading}
										characters={propsCondition()}
									/>
								) : (
									<CardView characters={propsCondition()} isLoading={isLoading} />
								)
							}
						/>

						<Route path="/chart" element={<ChartView />} />
					</Routes>
				</BrowserRouter>
				<Stack
					spacing={2}
					style={{
						display: window.location.pathname === '/chart' ? 'none' : 'inline-block'
					}}>
					<Pagination
						count={pageCount}
						page={page}
						onChange={handleChangePage}
						variant="outlined"
						shape="rounded"
					/>
				</Stack>
			</div>
		</ThemeProvider>
	);
}

export default App;
