let modalQt = 1;
let cart = [];
let modalKey = 0;

const doc = (e) => document.querySelector(e);
const docAll = (e) => document.querySelectorAll(e);

//PIZZA LIST
shirtJson.map((item, index) => {
    let shirtItem = doc('.models .shirt-item').cloneNode(true);

    shirtItem.setAttribute('data-key', index);
    shirtItem.querySelector('.shirt-item--img').style.backgroundImage = `url(${item.img})`;
    shirtItem.querySelector('.shirt-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    shirtItem.querySelector('.shirt-item--name').innerHTML = item.name;
    shirtItem.querySelector('.shirt-item--desc').innerHTML = item.description;
    shirtItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.shirt-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        doc('.shirtBig img').src = shirtJson[key].img;
        doc('.shirtInfo h1').innerHTML = shirtJson[key].name;
        doc('.shirtInfo--desc').innerHTML = shirtJson[key].description;
        doc('.shirtInfo--actualPrice').innerHTML = `R$ ${shirtJson[key].price.toFixed(2)}`;
        doc('.shirtInfo--size.selected').classList.remove('selected');
        docAll('.shirtInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            };

            size.querySelector('span').innerHTML = shirtJson[key].sizes[sizeIndex]
        });

        doc('.shirtInfo--qt').innerHTML = modalQt;

        doc('.shirtWindowArea').style.opacity = '0';
        doc('.shirtWindowArea').style.display = 'flex';
        setTimeout(() => {
            doc('.shirtWindowArea').style.opacity = '1'
        }, 200);
    });

    doc('.shirt-area').append(shirtItem);
});

//MODAL EVENTS
function closedModal() {
    doc('.shirtWindowArea').style.opacity = '0';
    setTimeout(() => {
        doc('.shirtWindowArea').style.display = 'none'
    }, 500);
};
docAll('.shirtInfo--cancelButton, .shirtInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closedModal);
});
doc('.shirtInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--;
        doc('.shirtInfo--qt').innerHTML = modalQt;
    };
});
doc('.shirtInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    doc('.shirtInfo--qt').innerHTML = modalQt;
});

docAll('.shirtInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        doc('.shirtInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//SHOPPING CART
doc('.shirtInfo--addButton').addEventListener('click', () => {
    let size = parseInt(doc('.shirtInfo--size.selected').getAttribute('data-key'))
    let identifier = shirtJson[modalKey].id+'@'+size
    let key = cart.findIndex((item) => item.identifier == identifier)
    
    if(key > -1) {
        cart[key].qt += modalQt
    } else {
        cart.push({
            identifier,
            id:shirtJson[modalKey].id,
            size,
            qt:modalQt
        })
    }

    updateCart()
    closedModal()
});

doc('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        doc('aside').style.left = '0';
    }
});
doc('.menu-closer').addEventListener('click', () => {
    doc('aside').style.left = '100vw'
})

function updateCart() {
    doc('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        doc('aside').classList.add('show');
        doc('.cart').innerHTML = '';

        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for(let i in cart) {
            let shirtItem = shirtJson.find((item) => item.id == cart[i].id);
            subtotal += shirtItem.price *  cart[i].qt;

            let cartItem = doc('.models .cart--item').cloneNode(true);

            let shirtSizeName;
            switch(cart[i].size) {
                case 0:
                    shirtSizeName = 'P';
                    break;
                case 1:
                    shirtSizeName = 'M';
                    break;
                case 2:
                    shirtSizeName = 'G';
                    break;
            };

            let shirtName = `${shirtItem.name} (${shirtSizeName})`

            cartItem.querySelector('img').src = shirtItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = shirtName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                };
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            doc('.cart').append(cartItem);
        };

        discount = subtotal * 0.1;
        total = subtotal - discount;

        doc('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        doc('.desconto span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`;
        doc('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        doc('aside').classList.remove('show');
        doc('aside').style.left = '100vw';
    };
};