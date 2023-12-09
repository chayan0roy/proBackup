import React from 'react'
import './Card.css'
import { Link, useNavigate } from 'react-router-dom';
import addToCartImg from '../../assets/cart1.png'

export default function Card({ cardData, addToCart, setBuyProductData }) {
    const navigate = useNavigate();

    const goToBuy = (e) => {
        setBuyProductData(e);
        navigate('/buyPage');
    }

    return (
        <div className='card slideBoxDiv'>
            <div className='imgArea flex'>
                <img src={cardData.productImage} />
            </div>
            <div className='textArea'>
                <h1>{cardData.productName}</h1>
                <div className='textAreaDetails'>
                    <h2>{cardData.companyName}</h2>
                    <h2 className='priceDetails'><span>{cardData.productPrice - ((cardData.productPrice * cardData.offer) / 100)}</span> <span><del>{cardData.productPrice}</del> </span> <span> {cardData.offer}% off </span></h2>
                    <h2>{cardData.deliveryCharge == 0 ? "free delivery " : "Delivery Charge " + cardData.deliveryCharge}</h2>
                </div>
                <div className='btnArea flex2'>
                    <button className="btnAreaBtn btn" onClick={() => goToBuy(cardData)}>Buy</button>
                    <button className="btnAreaBtn btn flex" onClick={() => addToCart(cardData)}>
                        <img src={addToCartImg} />
                    </button>
                </div>
            </div>
        </div>
    )
}
