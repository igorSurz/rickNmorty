import { useContext, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Input from '@mui/material/Input';

import { Context } from '../context/Context';
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	NativeSelect,
	Popover,
	Typography
} from '@mui/material';

export default function NavMenu(props) {
	const [searchValue, setSearchValue] = useState('');
	const contextData = useContext(Context);
	const [open, setOpen] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const [gender, setGender] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		contextData.changeData(searchValue);
	}, [contextData, searchValue]);

	const toggleDrawer = () => {
		props.clickProps();
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onChangeHandler = e => {
		setSearchValue(e.target.value);
		setAnchorEl(e.target);
	};

	const onGenderChange = e => {
		setGender(e.target.value);
		contextData.changeGender(e.target.value);
	};

	const onStatusChange = e => {
		setStatus(e.target.value);
		contextData.changeStatus(e.target.value);
	};

	const resetHandler = () => {
		setSearchValue('');
		setAnchorEl('');
		setGender('');
		contextData.changeGender('');
		setStatus('');
		contextData.changeStatus('');
	};

	const changeViewHandler = () => {
		if (contextData.view === 'table') {
			contextData.changeView('cards');
		}
		if (contextData.view === 'cards') {
			contextData.changeView('table');
		}
	};

	const selectRendered = () => {
		return (
			<div style={{ paddingRight: '20px', paddingLeft: '20px' }}>
				<Grid id="top-row" container spacing={8}>
					<Grid item xs={3}>
						{searchRender()}
					</Grid>
					<Grid item xs={2}>
						<Box sx={{ minWidth: '120px' }}>
							<FormControl fullWidth={false}>
								<InputLabel variant="standard" htmlFor="uncontrolled-native">
									Gender
								</InputLabel>
								<NativeSelect value={gender} onChange={onGenderChange}>
									<option aria-label="None" value="" />
									<option value="female">Female</option>
									<option value="male">Male</option>
									<option value="genderless">Genderless</option>
									<option value="unknown">Unknown</option>
								</NativeSelect>
							</FormControl>
						</Box>
					</Grid>
					<Grid item xs={2}>
						<Box sx={{ minWidth: '120px' }}>
							<FormControl fullWidth={false}>
								<InputLabel variant="standard" htmlFor="uncontrolled-native">
									Status
								</InputLabel>
								<NativeSelect value={status} onChange={onStatusChange}>
									<option aria-label="None" value="" />

									<option value="alive">Alive</option>
									<option value="dead">Dead</option>
									<option value="unknown">Unknown</option>
								</NativeSelect>
							</FormControl>
						</Box>
					</Grid>
					<Grid item xs={2}>
						<Box sx={{ minWidth: '120px' }}>
							<Button
								onClick={resetHandler}
								variant="contained"
								className="topMenuTriggerButton">
								Reset All
							</Button>
						</Box>
					</Grid>
					<Grid item xs={2}>
						<Box sx={{ minWidth: '180px' }}>
							<Button
								onClick={changeViewHandler}
								variant="contained"
								className="topMenuTriggerButton">
								Toggle View
							</Button>
						</Box>
					</Grid>
				</Grid>
			</div>
		);
	};

	const popoverHandler = () => {
		if (contextData.error) {
			return (
				<Popover
					id="simple-popover"
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}>
					<Typography sx={{ p: 2 }}>{contextData.error}</Typography>
				</Popover>
			);
		}
	};

	const searchRender = () => {
		return (
			<>
				Search:{' '}
				<DebounceInput
					value={searchValue}
					element={Input}
					minLength={2}
					debounceTimeout={300}
					onChange={onChangeHandler}
				/>
			</>
		);
	};

	const list = anchor => (
		<Box sx={{ width: anchor === 'top' }} role="presentation">
			<List onClick={toggleDrawer}>
				{['Some Future', 'Links to Pages'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List></List>
			{popoverHandler()}

			<List>{selectRendered()}</List>
		</Box>
	);

	return (
		<div>
			<Drawer anchor="top" open={props.isOpen} onClose={toggleDrawer}>
				{list('top')}
			</Drawer>
		</div>
	);
}
