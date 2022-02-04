import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import { Chart, ArgumentAxis, ValueAxis, BarSeries } from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';

export default function Demo() {
	const [isLoading, setIsLoading] = useState(true);

	const [state, setState] = useState({
		data: []
	});

	const fetchEpisodes = useCallback(async () => {
		try {
			const { data } = await axios.get(`https://rickandmortyapi.com/api/episode`);

			const mapped = data.results.map(el => ({
				episode: el.episode,
				char: el.characters.length
			}));

			setState({ data: mapped });
		} catch (e) {}
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
