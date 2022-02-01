import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Pagination, Stack } from '@mui/material';

import { Context } from '../context/Context';

export default function MainTable() {
	const { searchData } = useContext(Context);
	const columns = ['name', 'origin', 'status', 'species', 'gender'];

	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [characters, setCharacters] = useState('');
	const [findChar, setFindChar] = useState('');

	const fetchCharacters = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`https://rickandmortyapi.com/api/character?page=${page}&name=${findChar}`
			);
			console.log(findChar);
			console.log('in cb', data.results);
			setCharacters(data.results);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
	}, [findChar, page]);

	useEffect(() => {
		fetchCharacters();
	}, [fetchCharacters]);

	useEffect(() => {
		setFindChar(searchData);
	}, [searchData]);

	const tableHeaderFormat = () => {
		if (!isLoading) {
			return columns.map((column, i) => (
				<TableCell key={i} align="center" style={{ textTransform: 'capitalize' }}>
					{column}
				</TableCell>
			));
		}
	};

	const tableCharacterFormat = () => {
		if (!isLoading) {
			return characters.map(character => {
				return (
					<TableRow hover role="checkbox" tabIndex={-1} key={character.id}>
						{columns.map((column, i) => {
							const value = character[column];
							return (
								<TableCell
									key={i.toString()}
									align="center"
									style={{ padding: '0px' }}>
									{column === 'name' ? (
										<ListItem>
											<ListItemAvatar>
												<Avatar alt="avatar" src={character.image} />
											</ListItemAvatar>
											<ListItemText
												primary={value}
												style={{
													paddingRight: '50px'
												}}
											/>
										</ListItem>
									) : value.name ? (
										value.name
									) : (
										value
									)}
								</TableCell>
							);
						})}
					</TableRow>
				);
			});
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<Paper sx={{ width: '100%' }}>
			<TableContainer sx={{ height: '93vh' }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>{tableHeaderFormat()}</TableRow>
					</TableHead>
					<TableBody>{tableCharacterFormat()}</TableBody>
				</Table>
			</TableContainer>
			<Stack spacing={2} style={{ display: 'inline-block' }}>
				<Pagination
					count={10}
					page={page}
					onChange={handleChangePage}
					variant="outlined"
					shape="rounded"
				/>
			</Stack>
		</Paper>
	);
}
