 import { FC, useState } from 'react';
 import { switchArr } from '../../../assets/scripts/switchArr';
 import { useDispatch } from 'react-redux';
 import {  setSort } from '../../../store/Slices/filterSlice';
 import { PropertySort, TypeSortFilter } from '../../../store/types/filter';
 
 import './style.scss'


 const defaultListBtns:TypeSortFilter[] = [
    {
        value: 'популярности',
        property: PropertySort.RATING,
        checked: true
    }, 
    {
        value: 'по цене', 
        property: PropertySort.PRICE,
        checked: false
    }, 
    {
        value: 'по алфавиту',
        property: PropertySort.TITLE,
        checked: false
    }
 ] 

 const FilterList: FC = () => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [listBtns, setListBtns] = useState<TypeSortFilter[]>(defaultListBtns);
    
    const dispatch = useDispatch();
    
    const eventMouseOut = () => {
        setIsHover(true)    
    }
    const eventMouseLeave = () => {
        setIsHover(false)
    }   

    
    const eventClickListBtn = (btn:TypeSortFilter) => {
        if(listBtns.find(prev => prev.checked && prev.property === btn.property)) return
        switchArr(setListBtns, btn);
        dispatch(setSort({
            value: btn.value,
            property: btn.property,
            checked: true
        })) 
    }

    return (
        <div className={isHover ? 'filter-list active' : 'filter-list'}
            onMouseLeave={eventMouseLeave}
        >
            <div className='filter-list__wrapper'>
                <p className='filter-list__title'>
                    <span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C"/>
                        </svg>
                        <b>Сортировка по:</b>
                    </span>
                    <span onMouseOver={eventMouseOut}>
                        {
                            listBtns.filter(btn => btn.checked == true)[0].value
                        }
                    </span>
                </p>
                <div className='filter-list__body'
                >
                    {
                        listBtns.map(btn => (
                            <button 
                                className={btn.checked ? 'active' : ''}
                                key={btn.value} 
                                onClick={ () => eventClickListBtn(btn)} 
                            >{btn.value}</button>)
                        )
                    }
                </div>
            </div>
        </div>
    );
 };
 
 export default FilterList;