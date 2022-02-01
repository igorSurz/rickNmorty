import { createContext } from 'react';

export const Context = createContext({
	searchData: '',
	error: '',
	gender: '',
	status: '',
	view: 'table',
	changeError: () => {},
	changeData: () => {},
	changeGender: () => {},
	changeStatus: () => {},
	changeView: () => {}
});
