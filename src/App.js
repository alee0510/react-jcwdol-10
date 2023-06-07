import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"

// @import page
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

// @import component
import ProtectedRoute from "./protected.routes"

// @import action
import { keepLogin } from "./store/slices/auth"

function App() {
	// @hooks
	const dispatch = useDispatch()

	// @side effect
	useEffect(() => {
		dispatch(keepLogin())
	}, [])

	return (
		<div className="h-screen w-screen bg-white">
			<Routes>
				<Route 
					path="/" 
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					} 
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default App