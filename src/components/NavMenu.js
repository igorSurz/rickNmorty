import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function NavMenu(props) {
	const [searchValue, setSearchValue] = useState('');

	const toggleDrawer = () => {
		props.clickProps();
	};

	const list = anchor => (
		<Box sx={{ width: anchor === 'top' }} role="presentation" onClick={toggleDrawer}>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<>
			<div>
				<DebounceInput
					minLength={2}
					debounceTimeout={500}
					onChange={event => setSearchValue(event.target.value)}
				/>

				<p>Value: {searchValue}</p>
			</div>
			<Drawer anchor="top" open={props.isOpen} onClose={toggleDrawer}>
				{list('top')}
			</Drawer>
		</>
	);
}
