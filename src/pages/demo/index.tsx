import React, { useEffect } from 'react'
import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";

export default function demo() {
	const back = () => {
		window.history.back();
	}
	// const params = useLocation(); // state接收参数
	// console.log('params::: ', params);
	const [params] = useSearchParams(); // search接收参数
	console.log('params::: ', params.get('id'));

	useEffect(() => {
		console.log("123::: ", 123);
	})
	
	return (
		<>
			<div >demo</div>
			<span style={{color: 'red'}} onClick={back}>back</span>
		</>
	)
}

