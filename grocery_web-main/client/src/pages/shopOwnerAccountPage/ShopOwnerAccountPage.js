import './ShopOwnerAccountPage.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import i from '../../assets/accont.png'


import Card from '../../components/card/Card'

export default function ShopOwnerAccountPage({ addToCart, setBuyProductData }) {

	useEffect(() => {
		getProducts();
	}, [])

	const [resultData, setResultData] = useState();
	const allCatagory = ["cookies", "cake", "brade", "milkShake", "hotdog"];

	const getProducts = async () => {
		const result = await axios.get("https://grocery-web-back.onrender.com/getProducts");
		setResultData(result.data);
	}


	return (
		<div className='ShopOwnerAccountPage'>
			<div className='accontDetailsTop flex'>
				<div className='imageArea flex'>
					<img src={i} />
				</div>
				<div className='textArea flex1'>
					<h1>Shop Name <span>(Shop Types)</span></h1>
					<h3>Shop owner Name</h3>
					<h4>Address</h4>
					<div className='followingArea flex2'>
						<div>
							<h4>Products</h4>
							<h4>2300</h4>
						</div>
						<div>
							<h4>Follower</h4>
							<h4>230</h4>
						</div>
						<div>
							<h4>Following</h4>
							<h4>520</h4>
						</div>
					</div>
				</div>
			</div>
			<div className='accontDetailsBottom'>
				<div className='topBar'>
					<ul>
						<li>Products</li>
						<li>Photos</li>
					</ul>
				</div>
				<div className='shopBody'>
					<div className='boxArea'>
						{
							resultData
								?
								<>
									<div className='boxAreaTop'>
										<h1>{allCatagory[1]}</h1>
										<Link className='link' to={`/secondPage/${allCatagory[1]}`}>See All</Link>
									</div>
									<div className='boxAreaBottom'>
										{
											resultData.map((e) => {
												if (e.catagory === allCatagory[1]) {
													return (
														<Card cardData={e} addToCart={addToCart} setBuyProductData={setBuyProductData} />
													);
												}
											})
										}
									</div>
								</>
								:
								<></>
						}
					</div>
				</div>
			</div>
		</div>
	)
}
