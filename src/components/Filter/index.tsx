import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setCategory } from '../../store/Slices/filterSlice/';

import FilterButton from '../UI/FilterButton/';
import FilterList from '../UI/FilterList/';

import { switchArr } from '../../assets/scripts/switchArr';

import './style.scss';

interface IFilterBtns {
    value: string,
    checked: boolean
}
const defaultFilterBtns:IFilterBtns[] = [
    {
        value: 'Все',
        checked: true
    },
    {
        value: 'Мясные',
        checked: false
    },
    {
        value: 'Вегетарианская',
        checked: false
    },
    {
        value: 'Гриль',
        checked: false
    },
    {
        value: 'Острые',
        checked: false
    },
    {
        value: 'Закрытые',
        checked: false
    },
]   

const Filter: React.FC = () => {
    
    const dispatch = useDispatch();     

    const [filterBtns, setFilterBtns] = useState(defaultFilterBtns);

    const eventClickFilterBtn = (btn:IFilterBtns) => {
        switchArr(setFilterBtns, btn);
        dispatch(setCategory(btn.value !== "Все" ? btn.value : ''));
    }

    return (
        <div className='filter container'>
            <div className='filter__wrapper'>
                <div className='filter__left'>
                    {
                        filterBtns.map((btn, index) => (
                            <FilterButton 
                                key={btn.value} 
                                name={btn.value} 
                                checked={btn.checked} 
                                onClick={() => eventClickFilterBtn(btn)}
                            />
                        ))
                    }
                    
                </div>
                <div className='filter__right'>
                    <FilterList />
                </div>
            </div>
        </div>
    );
};

export default Filter ;