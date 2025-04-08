const params = new URLSearchParams(window.location.search)

let product = {}
if (params.get("id") === null) {
    params.set("id", 0)
    window.location = window.location.href.split("?")[0] + "?" + params.toString()
} else {
    product = items.find(e=>params.get("id") === e.id+"")
}

document.querySelector(".product__img").src = `img/catalogue/${product.id}.jpg`
document.querySelector("h3").innerHTML = product.name
document.querySelector(".product__price").innerHTML = `${product.price} ₽`
document.querySelector(".product__rating p").innerHTML = product.rating
document.querySelector(".product__description").innerHTML = product.description
document.querySelector(".product__category").innerHTML = product.category



let items_new = items.filter(item=>item.category == product.category&&item.id != product.id)
items_new = items_new
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
for (let i = 0; i < 4; i++) {
    document.querySelector(".see-also__wrapper").innerHTML += `
    <a href="product.html?id=${items_new[i].id}" class="catalogue__item">
            <img src="img/catalogue/${items_new[i].id}.jpg" alt="">
            <div class="item__bottom">
                <h5>${items_new[i].name}</h5>
                <div class="item__info">
                    <div class="item__rating">
                        <img src="img/icons/star.svg" alt="">
                        <p>${items_new[i].rating}</p>
                    </div>
                    <p class="item__cost">
                        ${items_new[i].price} ₽
                    </p>
                </div>
            </div>
        </a>
    `
}