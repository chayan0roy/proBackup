import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import './FrontPage.css'
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';


export default function FrontPage({ addToCart, setBuyProductData }) {

	const navigate = useNavigate();

	useEffect(() => {
		getProducts();
		getCompany();
	}, [])

	const [resultData, setResultData] = useState();
	const [companyLists, setCompanyLists] = useState();

	const allCatagory = ["cookies", "cake", "brade", "milkShake", "hotdog"];

	const getProducts = async () => {
		const result = await axios.get("https://grocery-web-back.onrender.com/getProducts");
		setResultData(result.data);
	}

	const getCompany = async () => {
		const result = await axios.get("https://grocery-web-back.onrender.com/getCompany");
		setCompanyLists(result.data);
	}


	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 2
	};


	return (
		<div className='frontPage'>
			<div>
				<div className='slideArea'>
					{
						resultData ?
							<>
								<div className='slideAreaTop'>
									<h1>{allCatagory[0]}</h1>
									<Link className='link' to={`/secondPage/${allCatagory[0]}`}>See All</Link>
								</div>
								<div className='slideAreaBottom'>
									<Slider {...settings}>
										{
											resultData.map((e) => {
												if (e.catagory === allCatagory[0]) {
													return (
														<div className='slideBox'>
															<Card cardData={e} addToCart={addToCart} setBuyProductData={setBuyProductData} />
														</div>
													);
												}
											})
										}
									</Slider>
								</div>
							</>
							:
							<></>
					}
				</div>
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
				<div className='boxArea'>
					{
						resultData
							?
							<>
								<div className='boxAreaTop'>
									<h1>{allCatagory[2]}</h1>
									<Link className='link' to={`/secondPage/${allCatagory[2]}`}>See All</Link>
								</div>
								<div className='boxAreaBottom'>
									{
										resultData.map((e) => {
											if (e.catagory === allCatagory[2]) {
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
				<div className='slideArea'>
					{
						resultData ?
							<>
								<div className='slideAreaTop'>
									<h1>{allCatagory[3]}</h1>
									<Link className='link' to={`/secondPage/${allCatagory[3]}`}>See All</Link>
								</div>
								<div className='slideAreaBottom'>
									<Slider {...settings}>
										{
											resultData.map((e) => {
												if (e.catagory === allCatagory[3]) {
													return (
														<div className='slideBox'>
															<Card cardData={e} addToCart={addToCart} setBuyProductData={setBuyProductData} />
														</div>
													);
												}
											})
										}
									</Slider>
								</div>
							</>
							:
							<></>
					}
				</div>
				<div className='boxArea'>
					{
						resultData
							?
							<>
								<div className='boxAreaTop'>
									<h1>{allCatagory[4]}</h1>
									<Link className='link' to={`/secondPage/${allCatagory[4]}`}>See All</Link>
								</div>
								<div className='boxAreaBottom'>
									{
										resultData.map((e) => {
											if (e.catagory === allCatagory[4]) {
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
				<div className='slideArea'>
					{
						companyLists ?
							<>
								<div className='slideAreaTop'>
									<h1>Company List</h1>
								</div>
								<div className='slideAreaBottom'>
									<Slider {...settings}>
										{
											companyLists.map((e) => {
												return (
													<div className='slideBox'>
														<div className='card slideBoxDiv'>
															<div className='imgArea flex'>
																<Link className='link companyImageLink' to={`/cplPage/${e.companyName}`}>
																	<img className='companyImage' src={e.companyImage} />
																</Link>
															</div>
														</div>
													</div>
												);
											})
										}
									</Slider>
								</div>
							</>
							:
							<></>
					}
				</div>
			</div>
		</div>
	)
}



