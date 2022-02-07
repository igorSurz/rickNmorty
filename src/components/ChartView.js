import { useEffect, useState } from 'react';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import { Chart, ArgumentAxis, ValueAxis, BarSeries } from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation, HoverState, EventTracker } from '@devexpress/dx-react-chart';

export default function Demo() {
	const [isLoading, setIsLoading] = useState(true);

	const [state, setState] = useState({
		data: []
	});

	useEffect(() => {
		const fetchAllCharacters = async () => {
			let all = Array(3)
				.fill()
				.map((e, i) => axios.get(`https://rickandmortyapi.com/api/episode?page=${i + 1}`));

			let data = await Promise.all(all);

			const mergedDataArray = data
				.map(element => element.data.results)
				.reduce((result, current) => result.concat(current), []);

			const mapped = mergedDataArray.map(el => ({
				episode: el.episode,
				char: el.characters.length
			}));

			setState({ data: mapped });
			setIsLoading(false);
		};
		fetchAllCharacters();
	}, []);

	const { data: chartData } = state;

	const chartRender = () => {
		if (!isLoading) {
			return (
				<>
					<Paper sx={{ height: '98vh', padding: '20px' }}>
						<Chart height={700} data={chartData} rotated>
							<ValueScale name="char" />
							<ValueScale name="total" />

							<ArgumentAxis />
							<ValueAxis scaleName="char" showGrid={true} />

							<BarSeries
								name="Episodes"
								valueField="char"
								argumentField="episode"
								scaleName="char"
							/>
							<EventTracker />
							<HoverState />
							<Animation />
						</Chart>
					</Paper>
				</>
			);
		}
	};

	return <>{chartRender()}</>;
}
