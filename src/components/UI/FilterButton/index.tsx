import React from 'react';

import './style.scss'

interface IProps {
    name: string, 
    checked: boolean, 
    onClick: () => void
}

const FilterButton: React.FC<IProps> = ({name, checked, onClick}) => {
    return (
        <button className={checked ? 'filter-btn checked' : 'filter-btn'} onClick={onClick}>{name}</button>
    );
};

export default FilterButton;