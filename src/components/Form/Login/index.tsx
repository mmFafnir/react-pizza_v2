import { FC, FormEvent, useEffect, useRef } from 'react';
import { validationInput } from '../../../assets/scripts/validation';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../store/Slices/loginSlice';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { NotifyActions } from '../../../store/Slices/loginSlice/type';
import { closeModal } from '../../../store/Slices/modalSlice';
import { useNavigate } from 'react-router-dom';


enum ErrorInputActions {
    EMPTY = 'empty',
    LENGTH = 'length',
    SYMBOL = 'symbol',
    SUCCESS = 'success'
}

const ModalLogin: FC = () => {

    const navigate = useNavigate();
    
    const inputLoginRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const { notify } = useTypeSelector(state => state.login);
    const dispatch = useDispatch();


    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!inputLoginRef.current || !inputPasswordRef.current) return;        
        const loginValid = validationInput(inputLoginRef.current);
        const passwordValid = validationInput(inputPasswordRef.current)
        console.log(loginValid && passwordValid)
        if(loginValid && passwordValid) {
            dispatch(logIn({
                login: inputLoginRef.current.value,
                password: inputPasswordRef.current.value
            }))

        }
    }


    useEffect(() => {
        if(notify === NotifyActions.SUCCESS) {
            dispatch(closeModal());
            navigate('/admin')
        } 
        if(notify === NotifyActions.ERROR) {
            inputLoginRef.current?.classList.add('error');
            inputPasswordRef.current?.classList.add('error');
        }
    }, [notify])

    console.log(notify)
    return (
        <div className='modal-login'>
            <div className='modal-login__wrapper'>  
                <form onSubmit={(e) => submitFormHandler(e)}>

                    <h3>Зайти как администратор</h3>
                    <label className='modal-login__input'>
                        <span>Логин</span>
                        <input ref={inputLoginRef} type="text" name='login'/>
                        <span className='error-notify'></span>
                    </label>
                    <label className='modal-login__input'>
                        <span>Пароль</span>
                        <input ref={inputPasswordRef} type="password" name='password '/>
                        <span className='error-notify'></span>
                    </label>
                    <span className={`modal-login__notify ${(notify === NotifyActions.ERROR) ? 'show' : ''}`}>Неправильный логин или пароль</span>

                    <button 
                        className='modal-login__submit' 
                        type='submit'

                    >Войти</button>
                </form>
            </div>
        </div>
    );
};

export default ModalLogin;