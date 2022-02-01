import { createContext } from 'react';

export const Context = createContext({
	searchData: '',
	error: '',
	gender: '',
	status: '',
	changeError: () => {},
	changeData: () => {},
	changeGender: () => {},
	changeStatus: () => {}
});
