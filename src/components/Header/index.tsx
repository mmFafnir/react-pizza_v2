import {FC, useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalLength, selectTotalPrice } from '../../store/Slices/cartPizzaSlice/selectors';
import { ModalEnum, modalOpen } from '../../store/Slices/modalSlice';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { UsersStatusActions } from '../../store/Slices/loginSlice/type';

import Logo from '../UI/Logo';
import Search from '../UI/Search';
    
import './style.scss';

const Header:FC = () => {

    const totalPrice = useSelector(selectTotalPrice);
    const totalLength = useSelector(selectTotalLength);
    const { user } = useTypeSelector(state => state.login);
    const dispatch = useDispatch();
    
    const [windowSize, setWindowSize] = useState<number[]>([window.innerWidth, window.innerHeight]);

    const openLoginModalHandler = () => dispatch(modalOpen({modalName: ModalEnum.LOGIN}));
    
    useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const renderPosLinks = () => {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Link to='/basket' className='header__btns header-price-btns'>
                    <span className='header-price-btns__price'>{totalPrice ? totalPrice : 0} ₽</span>
                    <span className='header-price-btns__link'>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{totalLength}</span>
                    </span>
                </Link>
                {user === UsersStatusActions.USER ? (
                        <button 
                            className='header__log-in' 
                            onClick={openLoginModalHandler}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                            </svg>
                        </button>
                    ) : (
                        <Link to={'/admin'} className='header__log-in' >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                            </svg>
                        </Link>
                )}
            </div>
        )
    }

    return (
        <header className='header'>
            <div className='header__wrapper'>
                <div className='header__left'>
                    <div className='header__logo'>
                        <Logo href={'/'} propClass={['logo-header']}/>
                    </div>
                    {
                        windowSize[0] < 810 ? (
                            renderPosLinks()
                        ) : null
                    }
                </div>
                <div className='header__right'>
                    <Search />
                    {
                        windowSize[0] > 810 ? (
                            renderPosLinks()
                        ) : null
                    }

                    
                </div>
            </div> 
        </header>
    );
};

export default Header;