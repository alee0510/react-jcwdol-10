import React from 'react';
import { configureStore, createSlice } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"

// @import css files
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

// @import main application component
import App from './App';

// reducer
const counterReducer = createSlice({
	name : "counter",
	initialState : {
		count : 0
	},
	reducers : {
		increment : (state, action) => {
			// do something, ex. heavy computation, etc.
			state.count += 1
		},
		decrement : (state, action) => {
			state.count -= 1
		}
	}
})

export const { increment, decrement } = counterReducer.actions

// @create store
const store = configureStore({
	reducer : {
		counter : counterReducer.reducer
	}
})

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
