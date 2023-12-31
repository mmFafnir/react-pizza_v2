
import { FC } from 'react';
import img from '../../assets/img/404.jpg';
import './style.scss';

const NotFound:FC = () => {
    return (
        <div className='not-found'>
             <div className="not-found__wrapper">
                <div className="not-found__img">
                    <img src={img} alt="not found" />
                </div>
             </div>
        </div>
    );
};

export default NotFound;