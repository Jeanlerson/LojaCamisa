let modalQt = 1

const doc = (e) => document.querySelector(e)
const docAll = (e) => document.querySelectorAll(e)

//PIZZA LIST
camisaJson.map((item, index) => {
    let camisaItem = doc('.models .camisa-item').cloneNode(true)

    camisaItem.setAttribute('data-key', index)
    camisaItem.querySelector('.camisa-item--img').style.backgroundImage = `url(${item.img})`
    camisaItem.querySelector('.camisa-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    camisaItem.querySelector('.camisa-item--name').innerHTML = item.name
    camisaItem.querySelector('.camisa-item--desc').innerHTML = item.description
    camisaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.camisa-item').getAttribute('data-key')
        modalQt = 1

        doc('.camisaBig img').src = camisaJson[key].img
        doc('.camisaInfo h1').innerHTML = camisaJson[key].name
        doc('.camisaInfo--desc').innerHTML = camisaJson[key].description
        doc('.camisaInfo--actualPrice').innerHTML = `R$ ${camisaJson[key].price.toFixed(2)}`
        doc('.camisaInfo--size.selected').classList.remove('selected')
        docAll('.camisaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = camisaJson[key].sizes[sizeIndex]
        })

        doc('.camisaInfo--qt').innerHTML = modalQt

        doc('.camisaWindowArea').style.opacity = '0'
        doc('.camisaWindowArea').style.display = 'flex'
        setTimeout(() => {
            doc('.camisaWindowArea').style.opacity = '1'
        }, 200)
    })

    doc('.camisa-area').append(camisaItem)
})

//MODAL EVENTS
function closedModal() {
    doc('.camisaWindowArea').style.opacity = '0'
    setTimeout(() => {
        doc('.camisaWindowArea').style.display = 'none'
    }, 500)
}
docAll('.camisaInfo--cancelButton, .camisaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closedModal)
})
doc('.camisaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--
        doc('.camisaInfo--qt').innerHTML = modalQt
    }
})
doc('.camisaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    doc('.camisaInfo--qt').innerHTML = modalQt
})

docAll('.camisaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        doc('.camisaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})