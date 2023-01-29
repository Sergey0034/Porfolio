document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

document.getElementById('choose-pizza').onclick = function () {
    document.getElementsByClassName('products')[0].scrollIntoView( {behavior: "smooth"});
}

let productInput = document.getElementById('product-input');
let addToCardButtons = document.getElementsByClassName('btn-add-to-cart');

for (let i = 0; i < addToCardButtons.length; i++) {
    addToCardButtons[i].onclick = function (e) {
        productInput.value = e.target.parentElement.previousElementSibling.previousElementSibling.innerText;
        document.getElementsByClassName('order')[0].scrollIntoView( {behavior: "smooth"});
    }
}

document.getElementById('create-order').onclick = function () {
    let addressInput = document.getElementById('address-input');
    let phoneInput = document.getElementById('phone-input');

    if (!productInput.value) {
        alert('Заполните пиццу');
        return;
    }
    if (!addressInput.value) {
        alert('Заполните адрес');
        return;
    }
    if (!phoneInput.value) {
        alert('Заполните телефон');
        return;
    }

    $.ajax( {
        method: 'GET',
        url: 'https://testologia.site/test-cookie?name=' + productInput.value,
        xhrFields: {  // для разрешения работы cookie
            withCredentials: true
        }
    })

    productInput.value = null;
    addressInput.value = null;
    phoneInput.value = null;
}

if (!localStorage.getItem('cookieAccepted')) {
    $('.cookie').show();
}

$('.cookie-accept').click(function () {
    $('.cookie').hide();
    localStorage.setItem('cookieAccepted', '1');
})

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// } ниже разбор этой функции

// function getCookie(name) {
//     const value = '; ' + document.cookie;
//     console.log(value);
//     const parts = value.split(`; ${name}=`);
//     console.log(parts);
//     if (parts.length === 2)
//         return parts.pop().split(';').shift();
// функция перенесена в объект cookie ниже

let cookie = {
    set: (name, value, options) => {
        if (!name || !value) {
            return null;
        }

        let string = name + '=' + value;
        if (options) {
            string += ';' + options;
        }

        document.cookie = string;
        return cookie;
    },
    get: (name) => {
        const value = '; ' + document.cookie;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2)
            return parts.pop().split(';').shift();
    },
    delete: (name) => {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:001 GMT';
    }
}