import React from 'react';

import gif from './sad-pizza.gif';
import './style.scss'
import 'swiper/css';
import Recommend from '../../Recommend';

const NoPizza: React.FC = () => {

    
    return (
        <div className='no-pizza opacity-show'>
            <div className='no-pizza__wrapper'>
                <div className='no-pizza__img'>
                    <img src={gif} />
                </div>
                <div className='no-pizza__title'>
                    <p>Нет такой пиццы, бери что предлагают (ง'̀-'́)ง</p>
                </div>

                <div className='no-pizza__recommend'>
                    <Recommend />
                </div>
            </div>
        </div>
    );
};

export default NoPizza;