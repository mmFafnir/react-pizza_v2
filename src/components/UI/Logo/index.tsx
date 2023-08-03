import React from 'react';
import { Link } from "react-router-dom";

import './stylle.scss'
import image from './logo.svg'

interface IProps {
    href: string,
    propClass: string[]
}

const Logo: React.FC<IProps> = ({href, propClass}) => {

    const classes = ['logo', ...propClass]

    return (
        <Link to="/" className={classes.join(' ')}>
            <img src={image} alt='logo' />
            <span className='logo-text'>
                <span className='logo-title'>REACT PIZZA</span>
                <span className='logo-desc'>самая вкусная пицца во вселенной</span>
            </span>            
        </Link>
    );
};

export default Logo;