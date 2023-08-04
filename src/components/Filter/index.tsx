import {FC} from 'react';

import { useDispatch } from 'react-redux';
import { setCategory } from '../../store/Slices/filterSlice/';

import FilterButton from '../UI/FilterButton/';
import FilterList from '../UI/FilterList/';

import './style.scss';

interface IFilterBtns {
    value: string,
}
const defaultFilterBtns:IFilterBtns[] = [
    {
        value: 'Все',
    },
    {
        value: 'Мясные',
    },
    {
        value: 'Вегетарианская',
    },
    {
        value: 'Гриль',
    },
    {
        value: 'Острые',
    },
    {
        value: 'Закрытые',
    },
]   

const Filter:FC = () => {
    
    const dispatch = useDispatch();     

    const eventClickFilterBtn = (btn:IFilterBtns) => {
        dispatch(setCategory(btn.value !== "Все" ? btn.value : ''));
    }

    return (
        <div className='filter container'>
            <div className='filter__wrapper'>
                <div className='filter__left'>
                    {
                        defaultFilterBtns.map((btn) => (
                            <FilterButton 
                                key={btn.value} 
                                name={btn.value} 
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