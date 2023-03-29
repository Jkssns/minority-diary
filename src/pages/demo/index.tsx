import React from 'react'

export default function demo() {
	const back = () => {
		window.history.back();
	}
	return (
		<>
			<div >demo</div>
			<span style={{color: 'red'}} onClick={back}>back</span>
		</>
	)
}

