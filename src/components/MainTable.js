import { useState } from 'react';

import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';

import ModalCard from './ModalCard';

export default function MainTable(props) {
	const columns = ['name', 'origin', 'status', 'species', 'gender'];

	const [tableRowOpen, setTableRowOpen] = useState({ trId: '', trIsOpen: false });

	const tableHeaderFormat = () => {
		if (!props.isLoading && props.characters) {
			return columns.map((column, i) => (
				<TableCell key={i} align="center" style={{ textTransform: 'capitalize' }}>
					{column}
				</TableCell>
			));
		}
	};

	const onModalOpen = () => {
		setTableRowOpen({ isOpen: false });
		console.log(222);
	};

	const tableCharacterFormat = () => {
		if (!props.isLoading && props.characters) {
			return props.characters.map(character => {
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

	//memo
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

	return <Paper sx={{ width: '100%' }}>{tableView()}</Paper>;
}
