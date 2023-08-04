import React, { FC } from 'react';
import Modal from '../../components/Modal';
import ModalLogin from '../../components/Form/Login';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { ModalEnum } from '../../store/Slices/modalSlice';
import ModalSettingPizza from '../../components/Form/SettingPizza';
import AddPizza from '../../components/Form/AddPizza';
import { useLocation } from 'react-router-dom';

const ModalLayout:FC = () => {
    const {modal} = useTypeSelector(state => state.modal);
    const location = useLocation();
    return (
        <>
            {
                modal.modalName === ModalEnum.LOGIN ? (
                    <Modal children={<ModalLogin />}/>
                ) : modal.modalName === ModalEnum.SETTING_PIZZA && location.pathname.includes('admin') ? (
                    <Modal children={<ModalSettingPizza />}/>
                ) : modal.modalName == ModalEnum.ADD_PIZZA && location.pathname.includes('admin') ? (
                    <Modal children={<AddPizza />} /> 
                ) : null
            }
        </>
    );
};

export default ModalLayout;