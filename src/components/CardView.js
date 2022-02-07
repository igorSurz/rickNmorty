import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

export default function CardView(props) {
	const cardRender = (character, index) => {
		return (
			<Grid item xs={2} sm={3} md={3} key={index}>
				<Item>
					<Card sx={{ maxWidth: 345 }}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="250"
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
				</Item>
			</Grid>
		);
	};

	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}));

	return (
		<TableContainer sx={{ height: '93vh' }}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
					{!props.isLoading &&
						props.characters.map((character, index) => cardRender(character, index))}
				</Grid>
			</Box>
		</TableContainer>
	);
}
