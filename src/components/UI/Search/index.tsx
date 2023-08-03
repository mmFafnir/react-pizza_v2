import { FC, KeyboardEvent, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setSearch } from '../../../store/Slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { Status } from '../../../store/types/status';

import './style.scss'

const Search:FC = () => {

    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement|null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    // const location = useLocation();
    const navigate = useNavigate();

    const glassEventClick = (status: boolean) => {
        setIsActive(status);
    }
    
    const handlerKeyPress = (e: KeyboardEvent) => {
        if(e.key === 'Enter') {
            if(window.location.pathname !== '/') {
                navigate('/');
            }
            dispatchSearchValue()  
        }
    }

    const dispatchSearchValue = () => {
        if(!inputRef.current) return;
        dispatch(setSearch(inputRef.current.value));
    }
    

    return (
        <div className={isActive ? 'pizza-search active' : 'pizza-search'}>
            <div className='pizza-search__wrapper'>
                <label className={isFocus ? 'focus' : ''}>
                    <input 
                        ref={inputRef} 
                        type='text' 
                        placeholder={Status.LOADING ? 'Загрузка...' : 'Поиск...'}
                        onKeyUp={handlerKeyPress}
                        className={Status.LOADING ? 'default' : ''}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}    
                    />
                    <svg onClick={() => glassEventClick(!isActive)} height="1em" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Search;