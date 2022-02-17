import {
	CardActionArea,
	TableContainer,
	Grid,
	Box,
	Typography,
	CardMedia,
	CardContent,
	Card
} from '@mui/material';

export default function CardView(props) {
	const cardRender = (character, index) => {
		return (
			<Grid item key={index}>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="350"
							image={character.image}
							alt={character.name}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{character.name}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{character.status}
								{character.species}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	return (
		<TableContainer sx={{ height: '93vh' }}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					{!props.isLoading &&
						props.characters.map((character, index) => cardRender(character, index))}
				</Grid>
			</Box>
		</TableContainer>
	);
}
