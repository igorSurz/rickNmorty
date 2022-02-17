import { createContext } from 'react';

export const Context = createContext({
	searchData: '',
	error: '',
	gender: '',
	status: '',
	view: '',
	changeError: () => {},
	changeData: () => {},
	changeGender: () => {},
	changeStatus: () => {},
	changeView: () => {}
});
