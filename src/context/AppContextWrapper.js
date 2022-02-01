import React, { useState } from 'react';
import { Context } from './Context';

export default function AppContextWrapper(props) {
	const [searchData, setData] = useState('');

	function changeData(data) {
		setData(data);
	}

	return (
		<Context.Provider value={{ searchData: searchData, changeData: changeData }}>
			{props.children}
		</Context.Provider>
	);
}
