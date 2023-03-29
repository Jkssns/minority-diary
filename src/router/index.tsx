import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/home/index';
import Demo from '@/pages/demo/index';

export default function () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
				<Route path="/route2" element={<Demo></Demo>}></Route>
			</Routes>
		</BrowserRouter>
	)
}