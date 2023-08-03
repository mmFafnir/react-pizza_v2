import React from 'react';


import './style.scss';

enum Actions {
    NEXT = 'next',
    PREV = 'prev'
}
const pages = [1,2];

interface IProps {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<IProps> = ({page, setPage}) => {

    const onClickButton = (action:Actions|number ) => {
        switch (action) {
            case Actions.NEXT:
                setPage(prev => prev+1);
                break;
            
            case Actions.PREV:
                setPage(prev => prev-1);
                break

            default:
                setPage(action)
                break;
        }
    }

    return (
        <div className='pagination'>
            <div className='pagination__wrapper'>
                <button 
                    onClick={() => onClickButton(Actions.PREV)} 
                    className={`${page===1 ? 'default' : ''} pagination-prev`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                    </svg>
                </button>
                
                {
                    pages.map(num => (
                        <button 
                            key={num}
                            onClick={() => onClickButton(num)} 
                            className={page===num ? 'active' : ''}
                        >
                            {num}
                        </button>
                    ))
                }

                <button 
                    onClick={() => onClickButton(Actions.NEXT)} 
                    className={`${page===pages.length ? 'default' : ''} pagination-next`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;