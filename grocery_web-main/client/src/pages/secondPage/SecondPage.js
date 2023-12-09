import './SecondPage.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';

export default function SecondPage({ addToCart, setBuyProductData }) {
	const navigate = useNavigate();
	const params = useParams();

	const [resultData, setResultData] = useState();

	useEffect(() => {
		getSPCodeData();
	}, [])

	const getSPCodeData = async () => {
		let result = await fetch(`https://grocery-web-back.onrender.com/SPCodeData/${params.catagory}`);
		result = await result.json();
		setResultData(result)
	}

	return (
		<div className='secondPage'>
			<div className='SecondPageBoxArea boxAreaBottom'>
				{
					resultData ?
						resultData.map((e) => {
							return (
								<Card cardData={e} addToCart={addToCart} setBuyProductData={setBuyProductData} />
							);
						})
						:
						<></>
				}
			</div>
		</div>

	)
}

