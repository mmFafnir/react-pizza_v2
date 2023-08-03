

import {FC, useState, useEffect} from 'react';
import { isHtmlElement } from '../../../assets/scripts/isHtmlElement';

import './style.scss';

interface IProps {
    items: string[]
    defaultItem?: string,
    getActiveValue: (select: string) => void 
}

const Select:FC<IProps> = ({items, defaultItem, getActiveValue}) => {

    const [active, setActive] = useState<boolean>(false)
    const [currentValue, setCurrenValue] = useState<string>(defaultItem ? defaultItem : items[0]);

    const closeSelect = (e:MouseEvent) => {
        if (!isHtmlElement(e.target))  return;
        if(e.target.closest('.select')) return;
        setActive(false); 
    } 

    useEffect(() => {
        document.addEventListener('click', closeSelect);

        return () => {
            document.removeEventListener('click', closeSelect);
        }
    }, [])


    useEffect(() => {
        getActiveValue(currentValue);
        setActive(false);
    }, [currentValue])
    
    return (
        <div className={`select ${active ? 'active' : ''}`}>
            <button className="select__title" onClick={() => setActive(prev=> !prev)}>
                <p>{currentValue}</p>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C"></path>
                </svg>
            </button>
            <div className="select__list">

                {
                    items.map(item => (
                        <button 
                            key={item} 
                            className={`select-item ${item === currentValue ? 'active' : ''}`}
                            onClick={() => setCurrenValue(item)}
                        >{item}</button>
                    ))
                }
            </div>
        </div>
    );
};

export default Select;