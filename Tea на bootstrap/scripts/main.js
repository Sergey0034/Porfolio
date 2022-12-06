new WOW({
    animateClass: 'animate__animated'
}).init();

// $('.open-popup-link').magnificPopup({
//     type:'inline',
//     midClick: true
// });

$('.image-card').magnificPopup({
    type:'image',
});

$('.slider').slick({
    prevArrow: "<img src='images/left-arrow.png' class='prev' alt='left'>",
    nextArrow: "<img src='images/right-arrow.png' class='next' alt='right'>",
});

$(function () {
    var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };
    $("#accordion").accordion({
        icons: icons
    });
    $("#toggle").button().on("click", function () {
        if ($("#accordion").accordion("option", "icons")) {
            $("#accordion").accordion("option", "icons", null);
        } else {
            $("#accordion").accordion("option", "icons", icons);
        }
    });
});

$('#inputNumber').keydown((e) => {

    if ((!parseInt(e.key)) || e.target.value.length >= 17)  {
        if (e.code === 'Backspace') {
            console.log(e.target.value = e.target.value.slice(0, -1));
        };
        return false;
    };

    if (e.target.value.length === 1) {
        e.target.value += ' (';
    } else if (e.target.value.length === 6) {
        e.target.value += ') ';
    } else if (e.target.value.length === 11) {
        e.target.value += '-';
    } else if (e.target.value.length === 14) {
        e.target.value += '-';
    };
});

$('#inputIndex').keydown((e) => {
    if (!parseInt(e.key)) {
        if (e.code === 'Backspace') {
            console.log(e.target.value = e.target.value.slice(0, -1));
        }
        return false;
    } else if ((e.target.value.length >= 6)) {
        alert('Поле Индекс должно содержать 6 цифр!');
        return false;
    }

})

$('.btn-submit').click(function () {
    if (!($('#inputName').val())) {
        alert('Заполните поле Имя');
        return;
    }
    if (!($('#inputSurname').val())) {
        alert('Заполните поле Фамилия');
        return;
    }
    if (!($('#inputNumber').val())) {
        alert('Заполните поле Телефон');
        return;
    }
    if (!($('#inputCountry').val())) {
        alert('Заполните поле Страна');
        return;
    }
    if (!($('#inputIndex').val())) {
        alert('Заполните поле Индекс');
        return;
    }
    if (!($('#inputAddress').val())) {
        alert('Заполните поле Адрес');
        return;
    }

    if (($('#inputIndex').val().length !== 6)) {
        alert('Поле Индекс должно содержать 6 цифр!');
        return;
    }

    $('.title-products').addClass('d-none');
    $('form').addClass('d-none');
    $('#card-order').removeClass('d-none'); // на случай блока, вместо попапа "спасибо за заказ"..
});


