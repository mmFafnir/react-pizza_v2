

import { FC, useState } from 'react';

import { TypePizza } from '../../store/types/pizza';
import { ModalEnum, modalOpen } from '../../store/Slices/modalSlice';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { deletePizza } from '../../store/Slices/pizzaSlice/asyncAction';
import { UseAnimateProps, useAnimate } from '../../hooks/useAnimate';

import loadingIcon from '../../assets/img/loading-icon.gif';
import './style.scss'


interface IProps {
    item: TypePizza
}


const params: UseAnimateProps = {
    mount: {
        style: {
            opacity: 1,
        },
        delay: 300
    },
    unMount: {
        style: {
            opacity: 0,
            maxHeight: '0px',
            marginBottom: 0
            
        },
        delay: 300
    }

}

const CardAdmin:FC<IProps> = ({item}) => {

    const [trashLoading, setTrashLoading] = useState<boolean>(false);
    const dispatch = useTypeDispatch();
    
    const { style, handleClose } = useAnimate(params)
    const openModalSettings = () => dispatch(modalOpen({modalName:ModalEnum.SETTING_PIZZA, context: item.defaultId}));
    const deletePizzaHandler = () => {
        setTrashLoading(true);
        handleClose(() => dispatch(deletePizza(String(item.id))));
    } 

    return (
        <div style={style} className='card-admin'>
            <div className="card-admin__wrapper"> 
                <div className="card-admin__left">
                    <div className="card-admin__img">
                        <img src={item.img} alt="" />
                    </div>
                    <div className="card-admin__text">
                        <h2>{item.title}</h2>
                        <p>от {item.price} ₽</p>
                        <div className="card-admin__btn">
                            <button className={trashLoading ? 'default' : ''} onClick={openModalSettings}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                                </svg>
                            </button>
                            <button className={trashLoading ? 'default' : ''} onClick={deletePizzaHandler}>
                                {
                                    trashLoading ? <img src={loadingIcon} alt="gif" /> : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                        </svg>
                                    ) 
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-admin__right">
                    <div className="card-admin-option">
                        <div className="card-admin-option__type">
                            <p>Толщина теста</p>
                            <ul>
                                {
                                    item.options.type.map((type, index) => (
                                        <li key={index}>
                                            <p>{type.value}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                {type.checked ? (
                                                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                                ) : (
                                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                                )}
                                            </svg>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="card-admin-option__size">
                            <p>Размер пиццы</p>
                            <ul>
                                {
                                    item.options.size.map((size, index) => (
                                        <li key={index}>
                                            <p>{size.value}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                {size.checked ? (
                                                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>

                                                ) : (
                                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                                )}
                                            </svg>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardAdmin;
{/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --></svg> */}