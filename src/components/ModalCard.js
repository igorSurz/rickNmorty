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
	height: '100%',
	width: '100%',
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
	const handleClose = () => {
		props.changeOpen();
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
									height="140"
									image="/static/images/cards/contemplative-reptile.jpg"
									alt="green iguana"
								/>

								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{props.data.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Lizards are a widespread group of reptiles, with over 6,000
										species, ranging across all continents except Antarctica
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
