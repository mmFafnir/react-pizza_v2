import React, { useEffect, useState } from 'react';

import { Status } from '../../store/types/status';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { fetchPizza } from '../../store/Slices/pizzaSlice/asyncAction';

import Filter from '../../components/Filter';
import Card from '../../components/Card';
import CardLoader from '../../components/UI/Loader/CardLoader'
import NoPizza from '../../components/UI/Error/NoPizza';
import Pagination from '../../components/UI/Pagination';

import './style.scss'

const templateArr: number[] = [];
for(let i=0; i < 8; i++) {
    templateArr.push(i)
}
const Main: React.FC = () => {
    
    const [page, setPage] = useState<number>(1);

    const {category, sort, search, limit} = useTypeSelector((state) => state.filter);
    const {items, status} = useTypeSelector((state) => state.pizza);
    const dispatch = useTypeDispatch();
    
    useEffect(() => {
        dispatch(fetchPizza({category: '', sort, search, page, limit}))
    }, [search])
    
    useEffect(() => {
        dispatch(fetchPizza({category, sort, search, page, limit}))
    }, [sort, category, page])
    
    useEffect(() => {
        dispatch(fetchPizza({category, sort, search, page, limit}))
    }, [])

    return (
        <div className='main-page'>
            <div className='main-page__wrapper'>
                <Filter />
                <main className='main container'>
                    <h2>Все пиццы</h2>
                    <div className='main__cards'>
                        {
                            (status === Status.LOADING) ? (
                                templateArr.map((index) => (
                                    <CardLoader key={index} />
                                ))
                            ) : status !== Status.EMPTY ? (
                                items.map((card) => (
                                    <Card key={card.defaultId} card={card}/>
                                ))
                            ) : (
                                <NoPizza />
                            )
                        }
                    </div>
                    {
                        status !== Status.EMPTY && category === ''  && search === '' ? <Pagination page={page} setPage={setPage}/> : null
                    }
                </main>
            </div>
        </div>
    );
};

export default Main;