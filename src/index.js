import React from 'react';
import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"

// @import css files
import "./index.css"

// @import main application component
import App from './App';

// @redux store
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App/>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
