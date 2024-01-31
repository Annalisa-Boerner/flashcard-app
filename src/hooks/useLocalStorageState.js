import React, { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue) => {
	const [state, setState] = useState(() => {
		let value;
		try {
			let item = window.localStorage.getItem(key);
			value = JSON.parse(item);
		} catch (err) {
			value = defaultValue;
		}
		return value;
	});
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
};

export default useLocalStorageState;
