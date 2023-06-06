import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home"

function App() {
	return (
		<div className="h-screen w-screen bg-white">
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App