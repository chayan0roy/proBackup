import { BrowserRouter } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react'

import Header from './components/header_footer/Header';
import PrivateComponent from './components/privateComponent/PrivateComponent';

function App() {

	const [isLogin, setIsLogin] = useState();
	const [buyProductData, setBuyProductData] = useState();

	const [PPCartData, setPPCartData] = useState([]);

	const addToCart = (newPPCartData) => {
		let found = false;
		let i = 0;

		for (i in PPCartData) {
			if (PPCartData[i]._id === newPPCartData._id) {
				found = true;
				break;
			}
		}

		if (found) {
			PPCartData[i].quantity++;
		} else {
			setPPCartData([...PPCartData, { ...newPPCartData, quantity: 1 }]);
		}
	}


	return (
		<div className="App">
			<BrowserRouter>
				<Header addToCart={addToCart} PPCartData={PPCartData} setPPCartData={setPPCartData} isLogin={isLogin} setIsLogin={setIsLogin} setBuyProductData={setBuyProductData} />
				<PrivateComponent isLogin={isLogin} setIsLogin={setIsLogin} addToCart={addToCart} buyProductData={buyProductData} setBuyProductData={setBuyProductData} />
			</BrowserRouter>
		</div>
	);
}

export default App;



