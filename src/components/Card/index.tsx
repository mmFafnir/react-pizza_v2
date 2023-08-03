import React, { useEffect, useState } from 'react';

import './style.scss'
import img from './card.png'
import { useDispatch, useSelector } from 'react-redux';
import { addItem} from '../../store/Slices/cartPizzaSlice';
import { Link } from 'react-router-dom';
import { calcTotalLength } from '../../assets/scripts/calcTotalLength';
import { selectCartAllById } from '../../store/Slices/cartPizzaSlice/selectors';
import { TypePizza } from '../../store/types/pizza';



interface IProps {
    card: TypePizza
}

const Card:React.FC<IProps> = ({card}) => {
    
    const [currentType, setCurrentType] = useState(card.options.type.find((opt) => opt.checked));
    const [currentSize, setCurrentSize] = useState(card.options.size.find((opt) => opt.checked));
    const [quantity, setQuantity] = useState(0);
    
    const cartPizza = useSelector(selectCartAllById(card.defaultId));
    const dispatch = useDispatch();

    
    const addToBasket = () => {
        if(!currentSize || !currentType) return;
        const totalPrice = Number(card.price) + Number(currentSize.sale) + Number(currentType.sale); 
        const pizza = {
            defaultId: String(card.defaultId),
            id: String(card.defaultId),
            title: card.title,
            img: card.img,
            price: totalPrice,  
            size: currentSize.value,
            type: currentType.value,
        }   
        dispatch(addItem(pizza))
        setQuantity(prev => prev+1)

    }

    useEffect(() => {
        setQuantity(calcTotalLength(cartPizza))
    }, [])

    
 
    return (
        <div className='card'>
            <div className='card__wrapper'>
                <div className='card__img'>
                    <Link to={`/pizza/${card.id }`}>
                        <img src={card.img} />
                    </Link>
                </div>
                <h3> <Link to={`/pizza/${card.id }`}>{card.title}</Link></h3>
                <form className='card-options'>
                    <div className='card-options__type'>
                        {
                            card.options.type.map((type, index) => (
                                <div key={index} className={type.checked ? `card-options__button` : 'card-options__button default'}>
                                    <input 
                                        type='radio' 
                                        name={card.defaultId + '-тип'}
                                        id={card.defaultId + type.value} 
                                        value={type.sale}
                                        defaultChecked={currentType == type ? true : false}
                                        onClick={() => setCurrentType(type)}
                                    />
                                    <label htmlFor={card.defaultId + type.value}>{type.value}</label>
                                </div>
                            ))
                        }
                    </div>
                    <div className='card-options__size' >
                        {
                          
                            card.options.size.map((size, index) => (
                                <div key={index} className={size.checked ? `card-options__button` : 'card-options__button default'}>
                                    <input 
                                        type='radio' 
                                        name={card.defaultId + 'размер'}
                                        id={card.defaultId + size.value} 
                                        value={size.sale}
                                        defaultChecked={currentSize == size ? true : false}
                                        onClick={() => setCurrentSize(size)}
                                    />
                                    <label htmlFor={card.defaultId + size.value}>{size.value}</label>
                                </div>
                            ))
                        }
               
                    </div>
                </form>
                <div className='card__footer'>
                    <p className='card__price'>
                        от {card.price} ₽
                    </p>
                    <button onClick={addToBasket} className='card-add'>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E"/>
                        </svg>
                        <span>Добавить </span>
                        {
                            quantity > 0 ? <span className='card-add__quantity'>{quantity}</span> : <></>  
                        }

                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;