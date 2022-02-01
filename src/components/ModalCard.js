import { useCallback, useEffect, useState } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	ClickAwayListener,
	Typography
} from '@mui/material';
import axios from 'axios';

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const modal = {
	height: 500,
	width: 400,
	boxShadow: 5
};

const Backdrop = styled('div')`
	z-index: -2000;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.2);
	-webkit-tap-highlight-color: transparent;
`;

export default function ModalCard(props) {
	const [episodes, setEpisodes] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchEpisodes = useCallback(async linkArr => {
		try {
			const { data } = await axios.get(linkArr);

			setEpisodes(prevState => [...prevState, data.episode]);
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		let first = props.data.episode;
		let link = first[first.length - 1];

		fetchEpisodes(props.data.episode[0]);
		if (props.data.episode.length > 1) {
			fetchEpisodes(link);
		}
		setLoading(true);
	}, [fetchEpisodes, props.data.episode]);

	const handleClose = () => {
		props.changeOpen();
	};

	let cardFooterFormat = () => {
		if (loading && episodes.length) {
			return (
				<>
					<p>The first episode the character appeared in {episodes[0]}</p>

					{episodes.length > 1 && (
						<p>The last episode the character appeared in {episodes[1]}</p>
					)}
				</>
			);
		}
	};

	return (
		<div>
			<ClickAwayListener onClickAway={handleClose}>
				<StyledModal
					className="someClassName"
					aria-labelledby="unstyled-modal-title"
					aria-describedby="unstyled-modal-description"
					BackdropComponent={Backdrop}
					open={props.isOpen}>
					<Box>
						<Card sx={modal}>
							<CardActionArea>
								<CardMedia
									component="img"
									height="350"
									image={props.data.image}
									alt={props.data.name}
								/>

								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{props.data.name}
									</Typography>
									<Typography
										component={'span'}
										variant="body2"
										color="text.secondary">
										{cardFooterFormat()}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Box>
				</StyledModal>
			</ClickAwayListener>
		</div>
	);
}
