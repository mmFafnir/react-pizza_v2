import {FC} from 'react';
import { useTypeSelector } from '../../../hooks/useTypeSelector';

import './style.scss'

interface IProps {
    name: string, 
    onClick: () => void
}

const FilterButton: FC<IProps> = ({name, onClick}) => {

    const category = useTypeSelector(state => state.filter.category);
    const checkIsActive = () => (category === '' ? 'Все' : category) === name;
    return (
        <button className={ checkIsActive() ? 'filter-btn checked' : 'filter-btn'} onClick={onClick}>{name}</button>
    );
};

export default FilterButton;