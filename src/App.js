import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home"
import AboutPage from "./pages/about"
import NotFoundPage from "./pages/not-found"

import "./App.css"
function App() {
	return (
		<div className="container-app">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App