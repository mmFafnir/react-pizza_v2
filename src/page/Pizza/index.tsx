import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchPizzaById } from '../../store/Slices/pizzaByIdSlice/asyncActions';
import { selectCartAllById } from '../../store/Slices/cartPizzaSlice/selectors';
import { addItem, deleteItemByFullPizza } from '../../store/Slices/cartPizzaSlice';

import { calcTotalLength } from '../../assets/scripts/calcTotalLength';
import { calcTotalPrice } from '../../assets/scripts/calcTotalPrice';
import { Status } from '../../store/types/status';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { TypeOptionValue } from '../../store/types/pizza';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';

import NoPizza from '../../components/UI/Error/NoPizza'

import loaderGif from './loader.gif';

import './style.scss'; 

enum SizeValues {
    MIDDLE = '30 см.', 
    SMALL = '26 см.',
    BIG = '40 см.'
}


const Pizza: React.FC = () => {

    const { defaultId } = useParams();
    
    const { item, status } = useTypeSelector((state) => state.pizzaById);
    const dispatch = useTypeDispatch();

    const cartPizza = useSelector(selectCartAllById(defaultId ? defaultId : ''));
    const [currentType, setCurrentType] = useState<TypeOptionValue>({
        value: 'Загрузка...',
        sale: 0,
        checked: true
    });
    const [currentSize, setCurrentSize] = useState<TypeOptionValue>({
        value: SizeValues.MIDDLE,
        sale: 0,
        checked: true
    });

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    const addCartHandler = () => {
        if(!currentSize || !currentType || !item) return;
        const pizza:TypeCartPizza = {
            defaultId: String(item.defaultId),
            id:String(item.defaultId),
            title: item.title,
            img: item.img,
            price: Number(price),  
            size: currentSize.value,
            type: currentType.value,
        }   
        dispatch(addItem(pizza));
        setQuantity(prev => prev+1);
    }

    const deleteCartHandler = () => {
        dispatch(deleteItemByFullPizza(String(item!.defaultId)));
        setQuantity(prev => prev-1);
    }

    useEffect(() => {
        if(!item) return;   
        const typeOption = item.options.type.find((opt) => opt.checked);
        const sizeOption = item.options.size.find((opt) => opt.checked);
        
        if(typeOption) setCurrentType(typeOption);
        if(sizeOption) setCurrentSize(sizeOption);
              
        if(cartPizza.length === 0) return;
        setTotalPrice(calcTotalPrice(cartPizza));
        setQuantity(calcTotalLength(cartPizza));     
    }, [item])

    useEffect(() => {
        if(cartPizza.length === 0) return;
        setTotalPrice(calcTotalPrice(cartPizza));
    }, [quantity])

    useEffect(() => {
        if(!item || !currentType || !currentSize) return;
        setPrice(Number(item.price) + Number(currentType.sale) + Number(currentSize.sale));
    }, [currentType, currentSize])  

    useEffect(() => {
        dispatch(fetchPizzaById({id: defaultId ? defaultId : ''}));
    }, [])    


    if(status === Status.LOADING) return <div className='loader'><img src={loaderGif} /></div>;
    if(status === Status.ERROR || !item) return <NoPizza /> 
    return (
        <div className='pizza-page'>
            <div className='pizza-page__wrapper container'>
                <main className='pizza-page__main'> 
                    <div className='pizza-page__left'>
                        <div className='pizza-page__img'> 
                            <div className='pizza-page__img_size'> <span>40 см</span></div>
                            <div className='pizza-page__img_size'> <span>30 см</span></div>
                            <img 
                                width={currentSize!.value == SizeValues.MIDDLE ? '80%' : currentSize!.value == SizeValues.SMALL ? '60%' : '100%'} 
                                height={currentSize!.value == SizeValues.MIDDLE ? '80%' : currentSize!.value == SizeValues.SMALL ? '60%' : '100%'}
                                src={item.img}
                                />
                        </div>
                    </div>
                    <div className='pizza-page__right'>
                        <div className='pizza-page__title'>
                            <h1>{item.title}</h1>   
                            <p>{currentSize!.value}, {currentType!.value} тесто, в корзине {quantity}шт.</p>
                        </div>
                        <div className='pizza-page__options'>
                            <form className='card-options'>
                                <h3>Толщина теста</h3>
                                <div className='card-options__type'>
                                        {
                                            item.options.type.map((type, index) => (
                                                <div key={index} className={type.checked ? `card-options__button` : 'card-options__button default'}>
                                                    <input 
                                                        type='radio' 
                                                        name={item.defaultId + '-тип'}
                                                        id={item.defaultId + type.value} 
                                                        value={type.sale}
                                                        checked={currentType == type ? true : false}
                                                        onChange={() => setCurrentType(type)}
                                                    />
                                                    <label htmlFor={item.defaultId + type.value}>{type.value}</label>
                                                </div>
                                            ))
                                        }
                                </div>
                                <h3>Размер пиццы</h3>
                                <div className='card-options__size' >
                                    {
                                    
                                        item.options.size.map((size, index) => (
                                            <div key={index} className={size.checked ? `card-options__button` : 'card-options__button default'}>
                                                <input 
                                                    type='radio' 
                                                    name={item.defaultId + 'размер'}
                                                    id={item.defaultId + size.value} 
                                                    value={size.sale}
                                                    checked={currentSize == size ? true : false}
                                                    onChange={() => setCurrentSize(size)}
                                                />
                                                <label htmlFor={item.defaultId + size.value}>{size.value}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </form>
                        </div>
                        <div className='pizza-page__price'>
                            <p>
                                Цена за одну пиццу: <b>{price}₽</b>
                            </p>
                            <p>
                                Общая стоимость: <b>{totalPrice+price}₽</b>
                            </p>
                        </div>
                        <div className='pizza-page__footer'>
                            <button 
                                className='pizza-page__add-cart'
                                onClick={addCartHandler}
                            >Добавить</button>
                            <button 
                                className={`pizza-page__delete-cart ${quantity === 0 ? 'default' : ''}`}
                                onClick={deleteCartHandler}
                            >Удалить</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Pizza;