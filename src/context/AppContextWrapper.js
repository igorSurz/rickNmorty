import React, { useState } from 'react';
import { Context } from './Context';

export default function AppContextWrapper(props) {
	const [searchData, setData] = useState('');
	const [error, setError] = useState('');

	function changeData(data) {
		setData(data);
	}

	function changeError(data) {
		setError(data);
	}

	return (
		<Context.Provider
			value={{
				searchData: searchData,
				changeData: changeData,
				error: error,
				changeError: changeError
			}}>
			{props.children}
		</Context.Provider>
	);
}
