document.getElementById('linkToProducts').onclick = () => {
    document.getElementById('products').scrollIntoView({behavior: "smooth"});
}

document.getElementById('linkToAbout').onclick = () => {
    document.getElementById('about').scrollIntoView({behavior: "smooth"});
}

document.getElementById('linkToOrder').onclick = () => {
    document.getElementById('order').scrollIntoView({behavior: "smooth"});
}

document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
});

let productInput = document.getElementById('product');
let addToCardButtons = document.getElementsByClassName('products__card-button');

for (let i = 0; i < addToCardButtons.length; i++) {
    addToCardButtons[i].onclick = function (e) {
        productInput.value = e.target.parentElement.parentElement.previousElementSibling.innerText;
        document.getElementsByClassName('order')[0].scrollIntoView({behavior: "smooth"});
    }
}

