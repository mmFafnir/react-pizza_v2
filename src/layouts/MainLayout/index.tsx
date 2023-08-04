import {FC} from 'react';

import { Outlet } from 'react-router-dom';
import Header from "../../components/Header";
import ModalLayout from '../ModalLayout';

const index:FC = () => {

    
    return (
        <div className='App'>
            <Header />
            <Outlet />
            <ModalLayout/>
        </div>
    );
};

export default index;