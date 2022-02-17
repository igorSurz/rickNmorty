import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { NavLink } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AppsIcon from '@mui/icons-material/Apps';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Input,
	Divider,
	List,
	Drawer,
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	NativeSelect,
	Popover,
	Typography
} from '@mui/material';

export default function NavMenu(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const contextData = useContext(Context);

	const toggleDrawer = () => {
		props.clickProps();
	};

	const onChangeHandler = e => {
		contextData.changeData(e.target.value);
		if (e.target.value.length > 2) setAnchorEl(e.target);
	};

	const onGenderChange = e => {
		contextData.changeGender(e.target.value);
	};

	const onStatusChange = e => {
		contextData.changeStatus(e.target.value);
	};

	const resetHandler = () => {
		contextData.changeData('');
		contextData.changeGender('');
		contextData.changeStatus('');
		contextData.changeError(null);
		props.propPageCount();
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
			<Box>
				<Grid
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						width: '50%',
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: '27%'
					}}
					id="top-row"
					container
					spacing={2}
					direction="row"
					justifyContent="space-around"
					alignItems="flex-end">
					<Grid item xs={12}>
						{searchRender()}
					</Grid>
					<Grid item xs={12}>
						<Box sx={{ minWidth: '180px' }}>
							<FormControl fullWidth={false}>
								<InputLabel variant="standard" htmlFor="uncontrolled-native">
									Gender
								</InputLabel>
								<NativeSelect value={contextData.gender} onChange={onGenderChange}>
									<option aria-label="None" value="" />
									<option value="female">Female</option>
									<option value="male">Male</option>
									<option value="genderless">Genderless</option>
									<option value="unknown">Unknown</option>
								</NativeSelect>
							</FormControl>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box sx={{ minWidth: '120px' }}>
							<FormControl fullWidth={false}>
								<InputLabel variant="standard" htmlFor="uncontrolled-native">
									Status
								</InputLabel>
								<NativeSelect value={contextData.status} onChange={onStatusChange}>
									<option aria-label="None" value="" />

									<option value="alive">Alive</option>
									<option value="dead">Dead</option>
									<option value="unknown">Unknown</option>
								</NativeSelect>
							</FormControl>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box sx={{ minWidth: '120px' }}>
							<Button
								onClick={resetHandler}
								variant="contained"
								className="topMenuTriggerButton">
								Reset All
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12}>
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
			</Box>
		);
	};

	const onClosePopover = () => {
		contextData.changeData('');
	};

	const searchRender = () => {
		return (
			<>
				<DebounceInput
					value={contextData.searchData}
					placeholder="Search Character"
					element={Input}
					minLength={2}
					debounceTimeout={300}
					onChange={onChangeHandler}
				/>
				<Popover
					id="simple-popover"
					disableAutoFocus={true}
					disableEnforceFocus={true}
					open={!!contextData.error && !!contextData.searchData}
					onClose={onClosePopover}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}>
					<Typography sx={{ p: 2 }}>{contextData.error}</Typography>
				</Popover>
			</>
		);
	};

	const list = () => (
		<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
			<nav aria-label="main mailbox folders">
				<List onClick={toggleDrawer}>
					<NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<AppsIcon />
								</ListItemIcon>
								<ListItemText primary="Main Table" />
							</ListItemButton>
						</ListItem>
					</NavLink>

					<NavLink style={{ textDecoration: 'none', color: 'white' }} to="/chart">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<AlignVerticalBottomIcon />
								</ListItemIcon>
								<ListItemText primary="Chart" />
							</ListItemButton>
						</ListItem>
					</NavLink>
				</List>
			</nav>
			<Divider />
			<nav aria-label="secondary mailbox folders">
				<List>{selectRendered()}</List>
			</nav>
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
