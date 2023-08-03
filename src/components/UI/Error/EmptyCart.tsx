

import React from 'react';
import { Link } from 'react-router-dom';

import img from './empty-cart.png';
import './style.scss'

const EmptyCart: React.FC = () => {
    return (
        <div className='empty-cart opacity-show'>
            <div className='empty-cart__wrapper '>
                <div className='empty-cart__img'> 
                    <img src={img}/>
                </div>
                <div className='empty-cart__title'>
                    <p>
                        Корзина пустая <span>😕</span>
                    </p> 
                </div>
                <Link to={'/'} className='empty-cart__link-back' >Вернуться к списку пицц</Link>
            </div>
        </div>
    );
};

export default EmptyCart;