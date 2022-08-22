import React, { useContext } from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import { AuthContext } from '../context/context';
import {privateRouts, publickRouts} from '../router/Routs';
import Loader from './UI/loager/Loader';

const AppRouters = () => {
	const {isAuth, isLoading} = useContext(AuthContext)
	console.log(isAuth);

	if (isLoading) {
		return <Loader />
	}

	return (
		isAuth
		?	
		<Routes>
			{privateRouts.map(route =>
				<Route
					path={route.path}
					element={<route.element />}
					exact={route.exact}
					key={route.path}
				/>
			)}
			<Route path="*" element={<Navigate to="/posts" />} />
		</Routes>
		:
		<Routes>
			{publickRouts.map(route =>
				<Route
					path={route.path}
					element={<route.element />}
					exact={route.exact}
					key={route.path}
				/>
			)}
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
};

export default AppRouters;
