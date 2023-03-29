import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/home/index';

export default function () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
			</Routes>
		</BrowserRouter>
	)
}