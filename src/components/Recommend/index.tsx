import { FC, useEffect, useState } from 'react';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { fetchRecommendPizza } from '../../store/Slices/recommendPizzaSlice/asyncAction';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';

import Card from '../Card';

import './style.scss';

const Recommend: FC = () => {

    const { items } = useTypeSelector(state => state.recommend);
    const dispatch = useTypeDispatch();
    
    const [swiper, setSwiper] = useState<SwiperClass>();
    const [isActiveSlide, setIsActiveSlide] = useState(0);
    const [windowSize, setWindowSize] = useState<number[]>([window.innerWidth, window.innerHeight]);

    const swiperNextHandler = () => swiper ? swiper.slideNext() : null;
    const swiperPrevHandler = () => swiper ? swiper.slidePrev() : null;
        

    
    useEffect(() => {
        dispatch(fetchRecommendPizza({limit: '5'}));


        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
          };
      
          window.addEventListener('resize', handleWindowResize);
      
          return () => {
            window.removeEventListener('resize', handleWindowResize);
          };
    }, [])


    return (
        <div className='recommend'>
            <h3>Рекомендованные пиццы</h3>
            <div className="recommend__main">

                <div className='recommend-swiper'>
                    <button className={`swiper-btn-arrow swiper-btn-arrow-prev ${isActiveSlide===0? 'default' : ''}`} onClick={swiperPrevHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                        </svg>
                    </button>
                    <Swiper
                        spaceBetween={(windowSize[0] < 1307) ? 10 : 50}
                        slidesPerView={(windowSize[0] < 500) ? 1 : (windowSize[0] < 764) ? 2 :  (windowSize[0] < 1130) ? 3 : 4}
                        navigation
                        onSwiper={setSwiper}
                        onSlideChange={(swiper) => setIsActiveSlide(swiper.activeIndex)}
                    >
                            {
                                items.map(card => (
                                    <SwiperSlide key={card.defaultId}>
                                        <Card card={card}/>
                                    </SwiperSlide> 
                                ))
                            }
                    </Swiper>
                    <button 
                        className={`swiper-btn-arrow swiper-btn-arrow-next ${isActiveSlide===items.length/2 ? 'default' : ''}`} 
                        onClick={swiperNextHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Recommend;