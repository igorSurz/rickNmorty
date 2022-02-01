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
import { Popover, Typography } from '@mui/material';

export default function NavMenu(props) {
	const [searchValue, setSearchValue] = useState('');
	const contextData = useContext(Context);
	const [open, setOpen] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		contextData.changeData(searchValue);
	}, [contextData, searchValue]);

	const toggleDrawer = () => {
		props.clickProps();
	};

	const onChangeHandler = e => {
		setSearchValue(e.target.value);
		setAnchorEl(e.target);
	};

	const handleClose = () => {
		setOpen(false);
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

	const list = anchor => (
		<Box sx={{ width: anchor === 'top' }} role="presentation">
			<List onClick={toggleDrawer}>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				Search:{' '}
				<DebounceInput
					element={Input}
					minLength={2}
					debounceTimeout={300}
					onChange={onChangeHandler}
				/>
			</List>
			{popoverHandler()}
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
