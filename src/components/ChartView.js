import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	BarSeries,
	Legend
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';

export default function Demo() {
	const [isLoading, setIsLoading] = useState(true);

	const [state, setState] = useState({
		data: [
			{ episode: 'Jan', char: 700 },
			{ episode: 'Feb', char: 100 },
			{ episode: 'March', char: 30 },
			{ episode: 'April', char: 107 },
			{ episode: 'May', char: 95 },
			{ episode: 'June', char: 150 }
		]
	});

	const fetchEpisodes = useCallback(async () => {
		try {
			const { data } = await axios.get(`https://rickandmortyapi.com/api/episode`);
			console.log('in chart', data);
			const mapped = data.results.map(el => ({
				episode: el.episode,
				char: el.characters.length
			}));

			setState({ data: mapped });
		} catch (e) {
			console.log(e.response.data.error);
		}
	}, []);

	useEffect(() => {
		fetchEpisodes();
		setIsLoading(false);
	}, []);

	const { data: chartData } = state;
	return (
		<>
			{!isLoading && (
				<Paper sx={{ height: '97vh' }}>
					<Chart data={chartData}>
						<ValueScale name="char" />
						<ValueScale name="total" />

						<ArgumentAxis />
						<ValueAxis scaleName="char" showGrid={true} showLine showTicks />

						<BarSeries
							name="Episodes"
							valueField="char"
							argumentField="episode"
							scaleName="char"
						/>
					</Chart>
				</Paper>
			)}
		</>
	);
}
