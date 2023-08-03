export const validationInput = (input: HTMLInputElement) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(input.value === '') {
        if(!input.parentElement) return;
        input.parentElement?.classList.add('empty-error');
        input.parentElement?.classList.add('error');
        input.parentElement.querySelector('.error-notify')!.textContent = 'Заполните поле';
        input.focus()
        return false;
    } else {
        if(!input.parentElement) return;
        input.parentElement?.classList.remove('error');
        input.parentElement.querySelector('.error-notify')!.textContent = '';
    }
    if(input.name === 'login' && format.test(input.value)) {
        if(!input.parentElement) return;
        input.parentElement?.classList.add('error');
        input.parentElement.querySelector('.error-notify')!.textContent = 'Присутсвуют недопустимые занки "@!#$%"';
        input.focus()
        return false
    } else {
        if(!input.parentElement) return;
        input.parentElement?.classList.remove('error');
        input.parentElement.querySelector('.error-notify')!.textContent = '';
    }
    if(input.type === 'password' && input.value.length <= 4) {
        if(!input.parentElement) return;
        input.parentElement?.classList.add('error');
        input.parentElement.querySelector('.error-notify')!.textContent = 'Пароль должен быть больше 4 символов';
        input.focus()
        return false
    } else {
        if(!input.parentElement) return;
        input.parentElement?.classList.remove('error');
        input.parentElement.querySelector('.error-notify')!.textContent = '';
    }
    return true
}



export const validImg = (src:string): boolean => {
    let res = true;
    let TYPE = ''
    const img = new Image();
    img.src = src;

    // img.onerror = () => {}

     img.onerror = () => {
        return TYPE = 'error';
    }
    console.log(TYPE)
    return res

}