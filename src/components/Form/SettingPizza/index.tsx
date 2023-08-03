import { FC, useEffect, useState } from 'react';

import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import { TypeOptionValue, TypePizza } from '../../../store/types/pizza';
import { putPizza } from '../../../store/Slices/pizzaSlice/asyncAction';
import { closeModal } from '../../../store/Slices/modalSlice';
import { selectPizzaById } from '../../../store/Slices/pizzaSlice/selectors';
import { Status } from '../../../store/types/status';
import { setLoading } from '../../../store/Slices/pizzaSlice';

import Option from './Option';
import Select from '../../UI/Select';

import loadingGif from '../../../assets/img/loading-icon.gif';
import '../style.scss';

const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const ModalSettingPizza: FC = () => {

    const id = useTypeSelector(state => state.modal.modal.context);
    const item  = useTypeSelector(selectPizzaById(String(id)));
    const loading = useTypeSelector(state => state.pizza.loading);

    const dispatch = useTypeDispatch();

    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<string>('0');
    const [img, setImg] = useState<string>('');
    const [types, setTypes] = useState<TypeOptionValue[]>([]);
    const [size, setSize] = useState<TypeOptionValue[]>([]);
    const [brokenImage, setBrokenImage] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
     
    const mapOption = (opt:TypeOptionValue, newOpt:TypeOptionValue) => (opt.value === newOpt.value) ? newOpt : opt;
    const changeOptionHandler = (opt: TypeOptionValue, type: string) => {
        if(type === 'size') setSize(prev => prev.map(size => mapOption(size, opt)));
        if(type === 'type') setTypes(prev => prev.map(type => mapOption(type, opt))); 
    }


    const putPizzaHandler = () => {
        if(!item) return;
        const pizza:TypePizza = {
            title, 
            price, 
            img, 
            defaultId: item.defaultId, 
            quantity: item.quantity,
            id: item.id, 
            category: category, 
            rating: item.rating,
            options: {
                type: types,
                size: size

            }
        }
        dispatch(putPizza(pizza)); 
        
    }

    useEffect(() => {
        if(!item) return;
        setTitle(item.title)
        setImg(item.img);
        setPrice(item.price);
        setTypes(item.options.type);
        setSize(item.options.size);
    }, [item]);


    useEffect(() => {
        if(loading !== Status.SUCCESS) return;
        dispatch(setLoading(Status.DEFAULT));
        dispatch(closeModal())
    }, [loading])

    if(!item) return <></>
    return (
        <div className='modal-setting-pizza'>
            <div className="modal-setting-pizza__wrapper">
                <h3>Настройки пиццы</h3>
                <div className="modal-setting-pizza__main">
                    <div className="modal-setting-pizza__input">
                        <span>Наименование пиццы:</span>
                        <input 
                            style={{width: '100%', marginLeft: '0px', marginTop: '5px'}} 
                            type="text" 
                            name='title' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    <div className="modal-setting-pizza__input">
                        <img src={img} alt={item?.title} onError={() => setBrokenImage(true)} onLoad={() => setBrokenImage(false)} style={{display: 'none'}}/>
                        <img src={!brokenImage ? img : 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'} alt={item?.title} />
                        <div>
                            <span>Картинка: </span> 
                            <input 
                                type="text" 
                                name='img' 
                                defaultValue={item?.img} 
                                placeholder='вставьте ссылку на картинку'
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-setting-pizza__input">
                        <span>Стартовая цена пиццы:</span>
                        <input type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>

                    <div className="modal-setting-pizza__select">
                        <p>Категория пиццы:</p>
                        <Select 
                            items={categories} 
                            defaultItem={item.category}
                            getActiveValue={setCategory}
                        />
                    </div>
                    <div className="modal-setting-pizza__checkbox">
                        <p>Настройки толщины теста</p>
                        {
                            item?.options.type.map((type) => (
                                <Option 
                                    opt={type} 
                                    key={type.value}  
                                    changeOptionHandler={changeOptionHandler} 
                                    type={'type'}
                                />
                            )) 
                        }                        
                    </div>
                    <div className="modal-setting-pizza__checkbox">
                        <p>Настройки размеров пиццы</p>
                        {   
                            item?.options.size.map((size) => (
                                <Option 
                                    opt={size} 
                                    key={size.value} 
                                    changeOptionHandler={changeOptionHandler} 
                                    type={'size'}
                                />
                            ))
                        }                        
                    </div>
                </div>
                <button 
                    onClick={putPizzaHandler} 
                    className={`modal-setting-pizza__put ${loading === Status.LOADING ? 'default' : ''}`}
                >
                    {
                        (loading === Status.LOADING) ? (
                            <span className='loading'>
                                <img src={loadingGif} alt="loading" />
                            </span>
                        ) : 'Сохранить изменения'
                    }
                </button>
            </div>
        </div>
    );
};

export default ModalSettingPizza;