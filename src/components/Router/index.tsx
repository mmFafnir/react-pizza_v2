import React from 'react';
import { BrowserRouter } from "react-router-dom";


interface IProps {
    children: React.ReactNode
}

const Router: React.FC<IProps> = ({children}) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
};

export default Router;