import { FC, MouseEvent } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import { setCategory, setSearch } from '../../../store/Slices/filterSlice';

import './stylle.scss'
import image from './logo.svg'

interface IProps {
    href: string,
    propClass: string[]
}

const Logo: FC<IProps> = ({href, propClass}) => {

    const classes = ['logo', ...propClass];
    const dispatch = useTypeDispatch();
    const location = useLocation();

    const onclickLogo = (e:MouseEvent<HTMLAnchorElement>) => {
        if(location.pathname !== '/') return; 
        dispatch(setCategory(''));
        dispatch(setSearch(''));
    }
    
    return (
        <Link to='/' onClick={onclickLogo} className={classes.join(' ')}>
            <img src={image} alt='logo' />
            <span className='logo-text'>
                <span className='logo-title'>REACT PIZZA</span>
                <span className='logo-desc'>самая вкусная пицца во вселенной</span>
            </span>            
        </Link>
    );
};

export default Logo;