import { Routes, Route } from "react-router-dom"
import Button, { SecondaryButton, PrimaryButton } from "./Button";

function App() {
	return (
		<div className="App">
			<Button title="Universal Button" variant="success"/>
			<Routes>
				<Route path="/" element={<Button title="My Custom Button" variant="danger"/>}/>
				<Route path="/secondary" element={<SecondaryButton title="My Custom Button" color="red"/>}/>
				<Route path="/primary" element={<PrimaryButton title="My Custom Button"/>}/>
			</Routes>
		</div>
	);
}

export default App