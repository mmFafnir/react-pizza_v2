import { ReactNode, FC } from 'react';
import { BrowserRouter } from "react-router-dom";


interface IProps {
    children: ReactNode
}

const Router:FC<IProps> = ({children}) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
};

export default Router;