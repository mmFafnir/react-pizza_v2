import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from "../../components/Header";
import ModalLayout from '../ModalLayout';
import { useTypeSelector } from '../../hooks/useTypeSelector';

const index: React.FC = () => {

    
    return (
        <div className='App'>
            <Header />
            <Outlet />
            <ModalLayout/>
        </div>
    );
};

export default index;