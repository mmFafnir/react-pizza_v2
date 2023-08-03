import { FC, useRef, useState, useEffect } from 'react';
import { TypeOptionValue, TypePizza } from '../../../store/types/pizza';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import { postPizza } from '../../../store/Slices/pizzaSlice/asyncAction';
import { closeModal } from '../../../store/Slices/modalSlice';
import { Status } from '../../../store/types/status';
import { setLoading } from '../../../store/Slices/pizzaSlice';

import Select from '../../UI/Select';
import Option from '../SettingPizza/Option';

import loadingGif from '../../../assets/img/loading-icon.gif'


const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const defType = [ 
    {
        "value": "тонкое",
        "sale": 100,
        "checked": false
    },
    {
        "value": "традиционное",
        "sale": 200,
        "checked": true
    }
]
const defSize = [
    {
        "value": "26 см.",
        "sale": 40,
        "checked": false
    },
    {
        "value": "30 см.",
        "sale": 50,
        "checked": true
    },
    {
        "value": "40 см.",
        "sale": 60,
        "checked": false
    }
]  
const AddPizza: FC = () => {
    
    const {items, loading} = useTypeSelector(state => state.pizza);
    
    const dispatch = useTypeDispatch();

    const inputTitleRef = useRef<HTMLInputElement>(null);
    const InputImgRef = useRef<HTMLInputElement>(null);
          
    const [img, setImg] = useState<string>('');
    const [price, setPrice] = useState<string>('110');
    const [types, setTypes] = useState<TypeOptionValue[]>(defType);
    const [size, setSize] = useState<TypeOptionValue[]>(defSize);
    const [brokenImage, setBrokenImage] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');


    const mapOption = (opt:TypeOptionValue, newOpt:TypeOptionValue) => (opt.value === newOpt.value) ? newOpt : opt;
    const changeOptionHandler = (opt: TypeOptionValue, type: string) => {
        if(type === 'size') setSize(prev => prev.map(size => mapOption(size, opt)));
        if(type === 'type') setTypes(prev => prev.map(type => mapOption(type, opt))); 
    }
    
    const postPizzaHandler = () => {
        (inputTitleRef.current?.value === '') ? inputTitleRef.current.classList.add('default') : inputTitleRef.current?.classList.remove('default');
        (img === '') ? InputImgRef.current?.classList.add('default') : InputImgRef.current?.classList.remove('default');
        if(inputTitleRef.current?.value === '' || img === '') return;
        const id = items.length + 1;
        const pizza:TypePizza = {
            defaultId: id + Math.floor(Math.random()*100), 
            id,
            title: inputTitleRef.current!.value,
            img,
            price, 
            category, 
            quantity: 0, 
            options: {type: types, size},
            rating: 4,
        }

        dispatch(postPizza(pizza))
    }
    
    useEffect(() => {
        if(loading !== Status.SUCCESS) return;
        dispatch(setLoading(Status.DEFAULT))
        dispatch(closeModal())
    }, [loading])
    


    return (
        <div className='modal-setting-pizza'>
            <div className="modal-setting-pizza__wrapper">
                <h3>Добавить пиццы</h3>
                <div className="modal-setting-pizza__main">
                    <div className="modal-setting-pizza__input">
                        <span>Наименование пиццы:</span>
                        <input 
                            ref={inputTitleRef}
                            style={{width: '100%', marginLeft: '0px', marginTop: '5px'}} 
                            type="text" 
                            name='title' 
                        />
                    </div>
                    <div className="modal-setting-pizza__input">
                        <img src={img} onError={() => setBrokenImage(true)} onLoad={() => setBrokenImage(false)} style={{display: 'none'}}/>
                        <img src={!brokenImage ? img : 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'} alt={'Картинка пиццы'} />
                        <div>
                            <span>Картинка: </span> 
                            <input 
                                ref={InputImgRef}
                                type="text" 
                                name='img' 
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
                            defaultItem={categories[0]}
                            getActiveValue={setCategory}
                        />
                    </div>
                    <div className="modal-setting-pizza__checkbox">
                        <p>Настройки толщины теста</p>
                        {
                            defType.map((type) => (
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
                            defSize.map((size) => (
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
                    onClick={postPizzaHandler} 
                    className={`modal-setting-pizza__put ${loading === Status.LOADING ? 'default' : ''}`}
                >
                    {
                        loading === Status.LOADING ? (
                            <div className='loading'>
                                <img src={loadingGif} alt="gif" /> 
                            </div>
                        ) : ("Добавить пиццу")
                    }
                </button>
            </div>
        </div>
    );
};

export default AddPizza;