import React, { useState } from 'react';
import { Context } from './Context';

export default function AppContextWrapper(props) {
	const [searchData, setData] = useState('');
	const [error, setError] = useState('');
	const [gender, setGender] = useState('');

	const [status, setStatus] = useState('');

	function changeData(data) {
		setData(data);
	}
	function changeError(data) {
		setError(data);
	}

	function changeGender(data) {
		setGender(data);
	}
	function changeStatus(data) {
		setStatus(data);
	}

	return (
		<Context.Provider
			value={{
				searchData: searchData,
				changeData: changeData,
				error: error,
				changeError: changeError,
				gender: gender,
				changeGender: changeGender,
				status: status,
				changeStatus: changeStatus
			}}>
			{props.children}
		</Context.Provider>
	);
}
