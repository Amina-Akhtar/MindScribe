import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import postReducer from './postSlice.js'
import notificationReducer from './notificationSlice.js';
//persist user login on refresh
const loadPersistedUserState = () => {
	try {
		const serializedState = localStorage.getItem('user');
		if (!serializedState) return undefined;
		return JSON.parse(serializedState);
	} catch (_err) {
		return undefined;
	}
};

const preloadedState = {
	user: loadPersistedUserState()
};

const store = configureStore({
	reducer: {
		user: userReducer,
		post: postReducer,
		notification: notificationReducer
	},
	preloadedState
});

store.subscribe(() => {
	try {
		const state = store.getState();
		const userState = state.user;
		localStorage.setItem('user', JSON.stringify(userState));
	} 
	catch (_err) {
	}
});

export default store;