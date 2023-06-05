import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home"
import { increment, decrement } from ".";



function App() {
	const [count, setCount] = useState(0);
	const countRedux = useSelector(state => state.counter.count)
	const dispatch = useDispatch()

	const onButtonIncrement = () => dispatch(increment())
	const onButtonDecrement = () => dispatch(decrement())

	console.log(countRedux)
	return (
		<div className="h-screen w-screen bg-white">
			{/* <Routes>
				<Route path="/" element={<HomePage />} />
			</Routes> */}

			<button className="btn" onClick={onButtonIncrement}>increment</button>
			<h1 className="bold text-4xl">{countRedux}</h1>
			<button className="btn" onClick={onButtonDecrement}>decrement</button>
		</div>
	);
}

export default App