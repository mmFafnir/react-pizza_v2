import React, { FC, useState, useEffect } from 'react';
import { TypeOptionValue } from '../../../store/types/pizza';


interface IProps {
    opt: TypeOptionValue,
    changeOptionHandler: (opt:TypeOptionValue, type: string) => void,
    type: string
}

const Option: FC<IProps> = ({opt, changeOptionHandler, type}) => {

    const [sale, setSale] = useState<number|string>(opt.sale);
    const [checked, setChecked] = useState<boolean>(opt.checked);
    
    useEffect(() => {
        changeOptionHandler({
            checked, 
            sale: sale === '' ? 0 : Number(sale), 
            value: opt.value}, 
            type)
    }, [checked, sale])

    return (
        <div> 
            <span>{opt.value}</span>
            <p>
                <span>В наличии:</span>
                <input 
                    id={opt.value} 
                    type="checkbox"  
                    checked={checked}
                    onChange={() => setChecked(prev => !prev)}
                />
                <label htmlFor={opt.value}></label>
            </p>
            <p>
                <span>Цена:</span>
                <input 
                    min={1}
                    type="number" 
                    value={sale}
                    onChange={(e) => setSale(Number(e.target.value) === 0 ? '' : Number(e.target.value))}
                />
            </p>
        </div>
    );
};

export default Option;