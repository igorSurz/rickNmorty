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
import ModalCard from './ModalCard';
import CardView from './CardView';
import { Context } from '../context/Context';

export default function MainTable() {
	const { searchData, changeError, gender, status, view } = useContext(Context);
	const columns = ['name', 'origin', 'status', 'species', 'gender'];

	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [pageCount, setPageCount] = useState(1);
	const [characters, setCharacters] = useState('');
	const [characterQuery, setCharacterQuery] = useState('');
	const [genderQuery, setGenderQuery] = useState('');
	const [statusQuery, setStatusQuery] = useState('');
	const [tableRowOpen, setTableRowOpen] = useState({ trId: '', trIsOpen: false });

	const fetchCharacters = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`https://rickandmortyapi.com/api/character?page=${page}&name=${characterQuery}&gender=${genderQuery}&status=${statusQuery}`
			);
			console.log('in cb', data);
			setCharacters(data.results);
			setIsLoading(false);
			setPageCount(data.info.pages);
		} catch (e) {
			changeError(e.response.data.error);
		}
	}, [changeError, characterQuery, genderQuery, page, statusQuery]);

	useEffect(() => {
		fetchCharacters();
	}, [fetchCharacters]);

	useEffect(() => {
		setCharacterQuery(searchData);
		setStatusQuery(status);
		setGenderQuery(gender);
	}, [gender, searchData, status]);

	const tableHeaderFormat = () => {
		if (!isLoading) {
			return columns.map((column, i) => (
				<TableCell key={i} align="center" style={{ textTransform: 'capitalize' }}>
					{column}
				</TableCell>
			));
		}
	};

	const onModalOpen = () => {
		setTableRowOpen(prevState => ({ ...prevState, isOpen: false }));
	};

	const tableCharacterFormat = () => {
		if (!isLoading) {
			return characters.map(character => {
				return (
					<TableRow
						hover
						role="checkbox"
						tabIndex={-1}
						key={character.id}
						onClick={() => setTableRowOpen({ trId: character.id, isOpen: true })}>
						{columns.map((column, i) => {
							const value = character[column];
							return (
								<TableCell
									key={i.toString()}
									align="center"
									style={{ padding: '0px' }}>
									{tableRowOpen.trId === character.id ? (
										<ModalCard
											data={character}
											isOpen={tableRowOpen.isOpen}
											changeOpen={onModalOpen}
										/>
									) : null}

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

	const tableView = () => {
		return (
			<TableContainer sx={{ height: '93vh' }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>{tableHeaderFormat()}</TableRow>
					</TableHead>
					<TableBody>{tableCharacterFormat()}</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<Paper sx={{ width: '100%' }}>
			{view === 'table' ? (
				tableView()
			) : (
				<CardView characters={characters} isLoading={isLoading} />
			)}
			<Stack spacing={2} style={{ display: 'inline-block' }}>
				<Pagination
					count={pageCount}
					page={page}
					onChange={handleChangePage}
					variant="outlined"
					shape="rounded"
				/>
			</Stack>
		</Paper>
	);
}
