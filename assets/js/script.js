const doc = (e) => document.querySelector(e)
const docAll = (e) => document.querySelectorAll(e)

camisaJson.map((item, index) => {
    let camisaItem = doc('.models .camisa-item').cloneNode(true)

    doc('.camisa-area').append(camisaItem)
})