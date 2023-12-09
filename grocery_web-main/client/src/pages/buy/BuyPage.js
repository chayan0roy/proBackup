import './BuyPage.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import addToCartImg from '../../assets/cart1.png'
import minusImg from '../../assets/MNS.png'
import plusImg from '../../assets/PLS.png'


export default function BuyPage({ buyProductData, addToCart }) {
    const navigate = useNavigate();
    const [productItem, setProductItem] = useState(1);

    const buyProduct = () => {
        alert('You successfully buy product');
        navigate('/');
    }
console.log(buyProductData);
    return (
        <div className='buyPage flex'>
            <div className='imgArea flex'>
                <img src={buyProductData.productImage}></img>
            </div>
            <div className='productDetailsArea'>
                <h1 className='productName'>{buyProductData.productName}</h1>
                <p className='productDesc'>{buyProductData.description}</p>
                <h3 className='productPriceArea flex3'><span>Product productPrice</span><span data-decoration="deleted">{buyProductData.productPrice * productItem}</span><span>{(buyProductData.productPrice - ((buyProductData.productPrice * buyProductData.offer) / 100)) * productItem}</span></h3>
                <h3 className='productPriceArea flex3'><span>Delivery Charge</span><span>{buyProductData.deliveryCharge}</span></h3>
                <h1 className='totalPriceArea flex3'>
                    <span>Total Price</span>
                    <button className='decrease_value' onClick={() => {
                        if (productItem > 1) {
                            setProductItem(productItem - 1);
                        }
                    }}>
                        <img src={minusImg}></img>
                    </button>
                    <h3>{productItem}</h3>
                    <button className='increase_value' onClick={() => {
                        setProductItem(productItem + 1);
                    }}>
                        <img src={plusImg}></img>
                    </button>
                    <span>{((buyProductData.productPrice - ((buyProductData.productPrice * buyProductData.offer) / 100)) * productItem) + buyProductData.deliveryCharge}</span>
                </h1>
                <div className='btnArea flex2'>
                    <button className='btnAreaBtn btn' onClick={() => buyProduct()}>Buy</button>
                    <button className="btnAreaBtn" onClick={() => addToCart(buyProductData)}>
                        <img src={addToCartImg} />
                    </button>
                </div>
            </div>
        </div>
    )
}