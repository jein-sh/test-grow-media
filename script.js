const body = document.querySelector('body');
const form = document.querySelector('form');
const modal = document.querySelector('.modal');

const phoneMask = () => {
    const phone = document.getElementById('user-phone');

    phone.addEventListener('keypress', (evt) => {
        if (evt.keyCode < 47 || evt.keyCode > 57) {
          evt.preventDefault();
        }
        if (phone.value.length === 0) {
          phone.value = '+7 (';
          phone.selectionStart = phone.value.length;
        }
        if (phone.value.length === 7) {
          phone.value += ') ';
        }
    });
      
    phone.addEventListener('click', (evt) => {
        if (phone.selectionStart < 4) {
          phone.selectionStart = phone.value.length;
        }
        if (evt.key === 'Backspace' && phone.value.length <= 4) {
          evt.preventDefault();
        }
    });
      
    phone.addEventListener('blur', () => {
        if (phone.value === '+7(') {
          phone.value = '';
        }
    });
      
    phone.addEventListener('keydown', (evt) => {
        if (evt.key === 'Backspace' && phone.value.length <= 4) {
          evt.preventDefault();
        }
        if (evt.key === 'ArrowLeft' && phone.value.length <= 4) {
          evt.preventDefault();
        }
    });
}

const initModal = () => {
    if (!modal) {
        return;
    }

    const closeModal = () => {
        modal.classList.remove('is-active');
        body.classList.remove('scroll-lock');
    }

    modal.classList.add('is-active');
    body.classList.add('scroll-lock');

    document.addEventListener('click', (evt) => {
      if(evt.target.closest('.modal__close')) {
        closeModal();
      }

      if(evt.target.closest('.modal') && !evt.target.closest('.modal__content')) {
        closeModal();
      }
    })

    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            closeModal();
        }
    });   
}

const initForm = () => {
    if (!form) {
        return;
    }

    phoneMask();
    const btnSubmit = form.querySelector('.form__btn');

   form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    fetch('https://echo.htmlacademy.ru', {
        method: 'POST',
        body: new FormData(form),
    }).then((response) => {
        if (response.ok) {
            initModal();
            form.reset();
            btnSubmit.blur(); 
        }
    })
   })
}

initForm();

