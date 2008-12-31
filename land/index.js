// кнопка 'Отправить' внизу страницы (без модального окна)
const sendButton = document.querySelectorAll('.contacts-tizer .send-email')[0];
sendButton.addEventListener('click', () => sendOrderHandler('.contacts-tizer'));

// кнопка 'Отправить' в модальном окне
const sendButtonInModal = document.querySelectorAll('.order-modal .send-email')[0];
sendButtonInModal.addEventListener('click', () => sendOrderHandler('.order-modal'));

// все кнопки, которые открывают модальное окно для ввода телефона
const openInputModalButtons = document.querySelectorAll('.open-modal');
openInputModalButtons.forEach(openModalButton => openModalButton.addEventListener('click', openInputModal));

// кнопка (буллет) 'Закрыть' в модальном окне
const closeInputModalButton = document.querySelectorAll('.close-modal')[0];
closeInputModalButton.addEventListener('click', closeInputModalByDagger);

// все поля для ввода телефона
const phonesElements = document.querySelectorAll('.phone-input');
const defaultInputValue = '+7 ';
phonesElements.forEach( phone => {
    phone.addEventListener('input', onPhoneChanging);
    phone.addEventListener('focus', onPhoneFocus);
});

// модальное окно для ввода телефона
const inputModalBackground = document.querySelectorAll('.modal-background.modal-input-phone')[0];
inputModalBackground.addEventListener('click', closeInputModalByBackgroung);

// сообщения об ошибках/успешной отправке
const messagesBlocks = document.querySelectorAll('.tizer-sending-message');

// функция показывающая сообщение об ошибках/успехе
function showMessage(type, text) {
    messagesBlocks.forEach(block => {
        block.innerHTML = text;
        block.classList.value = 'tizer-sending-message';
        block.classList.add(type);
        block.style.visibility = 'visible';
    });
};
function hideMessage() {
    messagesBlocks.forEach(block => {
        block.innerHTML = 'Ошибка ввода';
        block.classList.value = 'tizer-sending-message';
        block.style.visibility = 'hidden';
    });
};

// обработчики модального окна с вводом телефона
function openInputModal() {
    phonesElements.forEach(phone => phone.value=defaultInputValue);
    hideMessage();
    inputModalBackground.style.display = 'block';
    document.querySelectorAll('.modal-background.modal-input-phone input')[0].focus();
};

function closeInputModalByDagger() {
    phonesElements.forEach(phone => phone.value=defaultInputValue);
    hideMessage();
    inputModalBackground.style.display = 'none';
};

function closeInputModalByBackgroung() {
    if (event.target === event.currentTarget) {
        phonesElements.forEach(phone => phone.value=defaultInputValue);
        hideMessage();
        inputModalBackground.style.display = 'none';
    }
};

// функции работы с полем ввода телефона
function isPhoneValid(phone) {
    return normilizePhone(phone).length === 10;
};

function onPhoneFocus() {
    hideMessage();
}

function normilizePhone(phone) {
    let normilizedPhone = phone.split(' ');
    if (normilizedPhone.length < 2) {
        normilizedPhone = '';
    } else {
        let [first, ...other ] = normilizedPhone;
        normilizedPhone = other.join('').replace(/[^\d]/g,'').substr(0, 10);
    }
    return normilizedPhone;
};

function onPhoneChanging(event) {
    let realPhoneOperator = '';
    let realPhoneNumber = '';
    let shownPhone = '';
    let newString = normilizePhone(event.target.value);
    
    if (newString.length < 4) {
        realPhoneOperator = newString.slice(0);
        shownPhone = `+7 (${realPhoneOperator}`;
    } else {
        realPhoneOperator = newString.substr(0, 3);
        realPhoneNumber = newString.slice(3);
        shownPhone = `+7 (${realPhoneOperator}) ${realPhoneNumber}`;
    }
    phonesElements.forEach(phoneElement => phoneElement.value = shownPhone);
};

// обработчик и отправитель данных
function sendOrderHandler(fromWhere) {
    let phone = document.querySelectorAll(fromWhere + ' .phone-input')[0].value;
    
    if ( !isPhoneValid(phone) ) {
        showMessage('error', 'Ошибка ввода');
        return;
    }

    sendOrder(phone)
        .then( response => {
            phonesElements.forEach(phone => phone.value=defaultInputValue);
            if (fromWhere === '.order-modal') {
            }
            showMessage('success', 'Заявка успешно отправлена');
        })
        .catch( error => {
            showMessage('error', 'Не удалось отправить заявку. Попробуйте еще раз.');
        });
};

function sendOrder(data) {
    return new Promise( (resolve, reject) => {

        setTimeout( () => {
            Math.random() > 0 ? resolve() : reject();
        }, 500);

    });
};

// контроль над плавующем меню
(function scrollHandler() {
    const advantagesKeysWrapper = document.querySelectorAll('.advantages-keys-wrapper')[0];
    const advantagesKeysHead = document.querySelectorAll('.advantages-header .tizer-title')[0];
    const advantagesKeys = document.querySelectorAll('.advantages-key');
    const advantagesItems = document.querySelectorAll('.advantages-list.for-menu');
    const chooseTerminal = document.querySelectorAll('.choose-terminal')[0];
    const advantagesItemFirst = document.querySelectorAll('.advantages-list.first.three-pics')[0];
    const advantagesItemFirstImages = document.querySelectorAll('.advantages-list.first.three-pics img');

    window.addEventListener('scroll', () => {
        let currentY = window.scrollY;

        let topForFixMenu = advantagesKeysHead.offsetTop + advantagesKeysHead.clientHeight;
        let bottomForFixMenu = advantagesItems[advantagesItems.length-1].offsetTop +
                advantagesItems[advantagesItems.length-1].clientHeight;
        
        advantagesItems.forEach( (key, index) => {
            if ( currentY + window.innerHeight/3 > key.offsetTop && currentY +window.innerHeight/3 < key.offsetTop + key.clientHeight ) {
                advantagesKeys[index].classList.add('active');
            } else {
                advantagesKeys[index].classList.remove('active');
            }

            if (currentY + window.innerHeight > key.offsetTop + key.clientHeight / 2 &&
                    currentY < key.offsetTop + key.clientHeight / 2 )
            {
                key.classList.add('unfade');
            } else {
                key.classList.remove('unfade');
            }
        });

        if ( currentY > topForFixMenu && currentY < bottomForFixMenu ) {
            advantagesKeysWrapper.classList.add('fixed');
            advantagesKeysHead.classList.add('extended');
        } else {
            advantagesKeysWrapper.classList.remove('fixed');
            advantagesKeys[0].classList.add('active');
            advantagesKeysHead.classList.remove('extended');
        }

        if (currentY + window.innerHeight > chooseTerminal.offsetTop) {
            chooseTerminal.classList.add('unfade');
        } else {
            chooseTerminal.classList.remove('unfade');
        }

        if ( (currentY + window.innerHeight > advantagesItemFirst.offsetTop + advantagesItemFirst.clientHeight/2) &&
                (currentY) < advantagesItemFirst.offsetTop + advantagesItemFirst.clientHeight/2 )
        {
            advantagesItemFirstImages.forEach( item => item.classList.add('unfade'));
        } else {
            advantagesItemFirstImages.forEach( item => item.classList.remove('unfade'));
        }

    });
})();