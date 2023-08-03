import { FC, KeyboardEvent, MouseEvent, ReactNode, useEffect, useState } from 'react';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/Slices/modalSlice';
import { isHtmlElement } from '../../assets/scripts/isHtmlElement';
import { UseAnimateProps, useAnimate } from '../../hooks/useAnimate';

import './style.scss'

interface IProps {
    children: ReactNode
}

const params:UseAnimateProps = {
    mount: {
        style: {
            opacity: 1,
        },
        delay: 300
    },
    unMount: {
        style: {
            opacity: 0
        },
        delay: 300
    }
}

const Modal:FC<IProps> = ({children}) => {
    
    const { style, handleClose } = useAnimate(params);
    const dispatch = useDispatch();

    const modalKeyClose = (e: globalThis.KeyboardEvent) => {
        if(e.key !== 'Escape') return;
        handleClose(() => dispatch(closeModal()));
    } 

    const modalCloseHandler = (e:MouseEvent) => {
        if (!isHtmlElement(e.target)) return;
        if(e.target.classList.contains('modal') || e.target.closest('.modal__close')) {
            handleClose(() => dispatch(closeModal()));
        }        
    }

    useEffect(() => {
        document.addEventListener('keyup', modalKeyClose);
        return () => {
            document.removeEventListener('keyup', modalKeyClose);
        }
    }, [])

    return (
        <div 
            className={`modal active`}
            style={style}
            onClick={(e) => modalCloseHandler(e)}
            // onKeyUp={(e) => e.key === 'esc' ? modalCloseHandler(e) : null}
        > 
            <div className='modal__wrapper'>
                <div className='modal__close'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;