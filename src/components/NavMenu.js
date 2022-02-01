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

export default function NavMenu(props) {
	const [searchValue, setSearchValue] = useState('');
	const contextData = useContext(Context);

	useEffect(() => {
		contextData.changeData(searchValue);
	}, [contextData, searchValue]);

	const toggleDrawer = () => {
		props.clickProps();
	};

	const onChangeHandler = e => {
		setSearchValue(e.target.value);
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
				<DebounceInput
					element={Input}
					minLength={2}
					debounceTimeout={300}
					onChange={onChangeHandler}
				/>
			</List>
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
