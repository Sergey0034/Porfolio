let loader = $('.lds-spinner');

$('#submit').click(function () {
    let product = $('#product');
    let name = $('#name');
    let phone = $('#phone');
    let hasError = false;
    product.css('border-color', 'rgb(130, 19, 40)');
    name.css('border-color', 'rgb(130, 19, 40)');
    phone.css('border-color', 'rgb(130, 19, 40)');
    loader.css('display', 'flex');

    $('.error-input').hide();

    if (!product.val()) {
        product.next().show();
        product.css('border-color', 'red');
        hasError = true;
        loader.hide();
    }

    if (!name.val()) {
        name.next().show();
        name.css('border-color', 'red');
        hasError = true;
        loader.hide();
    }

    if (!phone.val()) {
        phone.next().show();
        phone.css('border-color', 'red');
        hasError = true;
        loader.hide();
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {product: product.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('#form').css('display', 'none');
                    $('.order-success').css('display','flex');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
    }
});

$('#phone').keydown((e) => {

    if ((!parseInt(e.key)) || e.target.value.length >= 23) {
        if (e.code === 'Backspace') {
            e.target.value = e.target.value.slice(0, -1);
        }
        if (e.key === '+') {
            e.target.value('+');
        }
        return false;
    }

    if (e.target.value.length === 4) {
        e.target.value += ' (';
    } else if (e.target.value.length === 8) {
        e.target.value += ') ';
    } else if (e.target.value.length === 13) {
        e.target.value += ' - ';
    } else if (e.target.value.length === 18) {
        e.target.value += ' - ';
    }
});
