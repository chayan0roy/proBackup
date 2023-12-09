import './CPLPage.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';

export default function CPLPage({ addToCart, setBuyProductData }) {
	const navigate = useNavigate();
	const params = useParams();

	const [resultData, setResultData] = useState();

	useEffect(() => {
		getCPData();
	}, [])

	const getCPData = async () => {
		let result = await fetch(`https://grocery-web-back.onrender.com/CPData/${params.companyName}`);
		result = await result.json();
		setResultData(result)
	}

	return (
		<div className='cplPage'>
			<div className='colPageBoxArea boxAreaBottom'>
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

