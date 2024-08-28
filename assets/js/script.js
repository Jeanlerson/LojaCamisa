const doc = (e) => document.querySelector(e)
const docAll = (e) => document.querySelectorAll(e)

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

        doc('.camisaBig img').src = camisaJson[key].img
        doc('.camisaInfo h1').innerHTML = camisaJson[key].name
        doc('.camisaInfo--desc').innerHTML = camisaJson[key].description

        doc('.camisaWindowArea').style.opacity = '0'
        doc('.camisaWindowArea').style.display = 'flex'
        setTimeout(() => {
            doc('.camisaWindowArea').style.opacity = '1'
        }, 200)
    })

    doc('.camisa-area').append(camisaItem)
})