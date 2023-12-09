import './AddToCart.css'
import React, { useState, useEffect } from "react"

import cartImg from '../../assets/cart.png'
import crossImg from '../../assets/cross.png'
import deletImg from '../../assets/trash.png'
import plusImg from '../../assets/PLS.png'
import minusImg from '../../assets/MNS.png'

export default function AddToCart({ PPCartData, setPPCartData }) {

	const [cartOpen, setCartOpen] = useState(false)

	const close = () => {
		setCartOpen(null)
	}

	const [cart, setCart] = useState([]);


	useEffect(() => {
		setCart(PPCartData);
	}, [PPCartData])

	return (
		<div className='cartList'>
			{cart ? (
				<>
					<div className='cartImg' onClick={() => setCartOpen(!cartOpen)}>
						<img src={cartImg}></img>
						<span className='flex'>{cart.length}</span>
					</div>

					{cartOpen && (
						<div className='openCart'>
							<div className='cartTop flex3'>
								<h1>Your Cart</h1>
								<div onClick={close}>
									<img src={crossImg}></img>
								</div>
							</div>
							<div className='cartList'>
								{
									cart.map((cartData, cartIndex) => {
										return (
											<div className='cart flex2'>
												<div className='leftArea flex3'>
													<img src={cartData.productImage} ></img>
													<h1>{cartData.productName}</h1>
												</div>
												<div className='rightArea flex2'>
													<button className='decrease_value' onClick={() => {
														const CART = cart.map((item, indx) => {
															return (cartIndex === indx ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item)
														})
														setCart(CART);
													}}>
														<img src={minusImg}></img>
													</button>
													<h3>{cartData.quantity}</h3>
													<button className='increase_value' onClick={() => {
														const CART = cart.map((item, indx) => {
															return (cartIndex === indx ? { ...item, quantity: item.quantity + 1 } : item)
														})
														setCart(CART);
													}}>
														<img src={plusImg}></img>
													</button>
													<div className='rpoductPrice'>
														<h3>{(cartData.productPrice - ((cartData.productPrice * cartData.offer) / 100)) * cartData.quantity}</h3>
														<h3 className='flex3'><del>{cartData.productPrice * cartData.quantity}</del></h3>
													</div>

													<button className='deleteChart flex' onClick={() => {
														const newChart = cart.filter((i) => i._id !== cartData._id);
														setCart(newChart);

														if (cart.length == 1) {
															setPPCartData([]);
														}
													}}><img src={deletImg}></img></button>
												</div>
											</div>
										)
									})
								}
								<div className='pricelist'>
									<h2 className='flex3'>Total Items <span>{cart.length}</span></h2>
									<h2 className='flex3'>Total amount <span>
										{
											cart.map(item => (item.productPrice - ((item.productPrice * item.offer) / 100)) * item.quantity).reduce((total, value) => total += value, 0)
										}
									</span></h2>
									<button className="pricelistBuyBtn btn">Buy</button>
								</div>
							</div>

						</div>
					)}
				</>
			) : (
				<button>Add to cart</button>
			)}
		</div>
	)
}