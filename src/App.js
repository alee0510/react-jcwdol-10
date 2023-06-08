import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"

// @import page
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

// @import component
import ProtectedRoute from "./protected.routes"

// @import action
import { keepLogin } from "./store/slices/auth/slices"

function App() {
	// @hooks
	const dispatch = useDispatch()
	const { isKeepLoginLoading } = useSelector(state => {
		return {
			isKeepLoginLoading : state.auth?.isKeepLoginLoading
		}
	})

	// @side effect
	useEffect(() => {
		dispatch(keepLogin())
	}, [])

	if (isKeepLoginLoading) return (
		<div className="h-screen w-screen flex flex-row align-bottom justify-center">
			<span className="loading loading-dots loading-lg"></span>
		</div>
	)

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