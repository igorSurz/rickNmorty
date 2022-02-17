import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 50px;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const modal = {
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
`;

export default function ModalCard(props) {
	const [episodes, setEpisodes] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let propEpisodes = props.data.episode;
		let lastEpisode = propEpisodes[propEpisodes.length - 1];

		const fetchEpisodes = async episode => {
			try {
				const { data } = await axios.get(episode);

				setEpisodes(prevState => [...prevState, data.episode]);
			} catch (e) {}
		};

		fetchEpisodes(propEpisodes[0]);

		if (propEpisodes.length > 1) fetchEpisodes(lastEpisode);

		setLoading(true);
	}, [props.data.episode]);

	const handleClose = e => {
		e.stopPropagation();
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
			<StyledModal
				disableAutoFocus
				className="rNmBgrnd"
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				onClick={handleClose}
				onClose={handleClose}
				BackdropComponent={Backdrop}
				open={props.isOpen}>
				<Card sx={modal}>
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
						<Typography component={'span'} variant="body2" color="text.secondary">
							{cardFooterFormat()}
						</Typography>
					</CardContent>
				</Card>
			</StyledModal>
		</div>
	);
}
