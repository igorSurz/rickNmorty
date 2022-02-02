import { useContext, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import { Link, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AppsIcon from '@mui/icons-material/Apps';

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
			<div>
				<Grid
					id="top-row"
					container
					spacing={2}
					direction="row"
					justifyContent="space-around"
					alignItems="flex-end">
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
				{popoverHandler()}
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

	const list = () => (
		<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
			<nav aria-label="main mailbox folders">
				<List onClick={toggleDrawer}>
					<Link href="/" color="inherit" underline="none">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<AppsIcon />
								</ListItemIcon>
								<ListItemText primary="Main Table" />
							</ListItemButton>
						</ListItem>
					</Link>
					<Link href="/chart" color="inherit" underline="none">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<AlignVerticalBottomIcon />
								</ListItemIcon>
								<ListItemText primary="Chart" />
							</ListItemButton>
						</ListItem>
					</Link>
				</List>
			</nav>
			<Divider />
			<nav aria-label="secondary mailbox folders">
				<List>{selectRendered()}</List>
			</nav>
		</Box>

		// 	<List >
		//
		// 		<MuiLink to="/" underline="none">
		// 			Main Table
		// 		</MuiLink>
		// 	</List>
		// 	<Divider />
		// 	<List></List>
		//

		//
		// </Box>
	);

	return (
		<div>
			<Drawer anchor="top" open={props.isOpen} onClose={toggleDrawer}>
				{list('top')}
			</Drawer>
		</div>
	);
}
