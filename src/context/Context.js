import { createContext } from 'react';

export const Context = createContext({
	searchData: '',
	error: '',
	changeError: () => {},
	changeData: () => {}
});
