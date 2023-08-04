
import { FC, useEffect, useState } from 'react';

import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { PropertySort } from '../../store/types/filter'
import { fetchPizza } from '../../store/Slices/pizzaSlice/asyncAction';
import { ModalEnum, modalOpen } from '../../store/Slices/modalSlice';
import { Status } from '../../store/types/status';

import CardAdmin from '../../components/CardAdmin';

import './style.scss'
import gif from './loading.gif'

const sort = { checked: true, value: 'по алфавиту', property: PropertySort.TITLE};

const Admin:FC = () => {

    const {items, status} = useTypeSelector((state) => state.pizza);
    const dispatch = useTypeDispatch();

    const [search, setSearch] = useState<string>('');

    const openModalAddPizza = () => dispatch(modalOpen({modalName: ModalEnum.ADD_PIZZA}));
    const onSearchHandler = () => {
        dispatch(fetchPizza({
            category: '', 
            search: search, 
            page: 1, 
            limit: null,
            sort
        }))
    }

    useEffect(() => {
        dispatch(fetchPizza({
            category: '', 
            search: search, 
            page: 1, 
            limit: null,
            sort
        }))
        console.log(status)
    }, [])

    return (
        <div className='admin-page'>
            <div className="admin-page__wrapper container">
                <div className="admin-page__header">
                    <div className="person">
                        <div className="person__img">
                            
                        </div>
                        <div className="person__text">
                            <h3>Акрамов Даврон</h3>
                            <p>Frontend devolper</p>
                        </div>
                    </div>
                </div>
                <div className="admin-page__main">
                    <div className="admin-settings">
                        <div className="admin-settings__left">
                            <div className="admin-setting-search">
                                <input  
                                    type="text" 
                                    name='search' 
                                    placeholder='Найти пиццу...' 
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyUp={(e) => e.key === 'Enter' ? onSearchHandler() : null}
                                />
                                <svg onClick={onSearchHandler} height="1em" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                                </svg>  
                            </div>
                        </div>
                        <div className="admin-settings__right">
                            <button onClick={openModalAddPizza} className='admin-add-pizza'>
                                Добавить пиццу
                            </button>
                        </div>
                    </div>
                    <div className="admin-page__pizza">          
                        {
                            (status === Status.EMPTY) ? (
                                <div className='admin-page__empty opacity-show'>
                                    <p>Пицц нет, добавьте новую пиццу</p>
                                </div>
                            ) : (status === Status.LOADING) ? (
                                <div className='admin-page__loading'>
                                    <img src={gif} alt="loading" />
                                </div>
                            ) : (
                                items.map(item => (
                                    <CardAdmin key={item.defaultId} item={item}/>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;