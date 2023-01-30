new WOW({
    animateClass: 'animate__animated'
}).init();

document.getElementById('burger').onclick = function () {
    document.getElementById('header-menu').classList.add('open');
}

document.querySelectorAll('#header-menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('header-menu').classList.remove('open');
    }
})

$('.slick-class').slick({
    dots: true,
    infinite: true,
    fade: true,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                arrows: false
            }
        }
    ]
});

$('.reviews-carousel').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 660,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
});

$('#button-menu').click(function () {
    $('.menu')[0].scrollIntoView({behavior: "smooth"});
})

$('#button-booking').click(function () {
    $('.booking')[0].scrollIntoView({behavior: "smooth"});
})

$('#linkToMenu').click(function () {
    $('.menu')[0].scrollIntoView({behavior: "smooth"});
})

$('#linkToHalls').click(function () {
    $('.halls')[0].scrollIntoView({behavior: "smooth"});
})

$('#linkToBooking').click(function () {
    $('.booking')[0].scrollIntoView({behavior: "smooth"});
})


$('#phone').keydown((e) => {

    if ((!parseInt(e.key)) || e.target.value.length >= 22) {
        if (e.code === 'Backspace') {
            e.target.value = e.target.value.slice(0, -1);
        }
        if (e.key === '+') {
            e.target.value('+');
        }
        if (e.key === '0') {
            e.target.value(0);
        }
        return false;
    }

    if (event.target.value.length === 2) {
        event.target.value += ' (';
    } else if (event.target.value.length === 7) {
        event.target.value += ') ';
    } else if (event.target.value.length === 12) {
        event.target.value += ' - ';
    } else if (event.target.value.length === 17) {
        event.target.value += ' - ';
    }
});

$('#submit').click(function () {
    let hasError = false;
    let name = $('#name');
    let phone = $('#phone');
    let time = $('#time');

    name.css('border-color', 'rgb(255, 255, 255)');
    phone.css('border-color', 'rgb(255, 255, 255)');
    time.css('border-color', 'rgb(255, 255, 255)');

    $('.error-input').hide();

    if (!name.val()) {
        name.next().show();
        name.css('border-color', 'red');
        hasError = true;
    }

    if (!phone.val()) {
        phone.next().show();
        phone.css('border-color', 'red');
        hasError = true;
    }

    if (!time.val()) {
        time.next().show();
        time.css('border-color', 'red');
        hasError = true;
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "mail.php",
            data: 'name=' + name.val() + '&phone=' + phone.val() + '&time=' + time.val()
        })
            .done(function (msg) {
                $('.booking-title').css('display', 'none');
                $('.booking-info').css('display', 'none');
                $('#form').css('display', 'none');
                $('.booking-success').css('display', 'flex');
                $('.booking-success')[0].scrollIntoView({block: "center", behavior: "smooth"});
            })
            .fail(function (msg) {
                alert('Возникла ошибка при бронировании, свяжитесть с нами по телефону для бронирования столика');
            })
    }
});

