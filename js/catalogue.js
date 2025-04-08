list = document.querySelector(".catalogue__list")

page = 1
let goods = []

const setList = (goods) => {
    list.innerHTML = ''
    goods.forEach(item => {
        list.innerHTML += `
        <a href="product.html?id=${item.id}" class="catalogue__item">
            <img src="img/catalogue/${item.id}.jpg" alt="">
            <div class="item__bottom">
                <h5>${item.name}</h5>
                <div class="item__info">
                    <div class="item__rating">
                        <img src="img/icons/star.svg" alt="">
                        <p>${item.rating}</p>
                    </div>
                    <p class="item__cost">
                        ${item.price} ₽
                    </p>
                </div>
            </div>
        </a>
        `
    });
}


const setFilters = () => {
    goods = []
    onPage = document.querySelector('input[name="onPage"]:checked').value
    sortBy = document.querySelector('input[name="sort"]:checked').value
    console.log(sortBy);

    category = document.querySelector("#category").value
    page = 1


    if (category == "all") {
        items.forEach(item => {
            goods.push(item)
        });
        document.querySelector(".catalogue h2").innerHTML = `Все товары, найдено ${goods.length}`
    } else {
        items.forEach(item => {
            if (item.category == category) {
                goods.push(item)
            }
        });
        document.querySelector(".catalogue h2").innerHTML = `${category}, найдено ${goods.length}`

    }

    if (sortBy == "price") {
        goods.sort(function (a, b) {
            return a.price.replace(" ", "") - b.price.replace(" ", "");
        });
    } else if (sortBy == "name") {
        goods.sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
    }
    else {
        goods.sort(function (a, b) {
            return b.rating - a.rating
        });
    }

    let canShow = goods.slice(onPage * (page - 1), onPage * page)
    setList(canShow)

    document.querySelector(".pagination__pages").innerHTML = ''

    for (let p = 0; p < goods.length / onPage; p++) {
        document.querySelector(".pagination__pages").innerHTML += `<div onclick="setPage(${p + 1})" class="page__number ${p + 1 == page ? "active" : ""}">${p + 1}</div>`
    }

}

const setPage = (p) => {
    page = p
    let canShow = goods.slice(onPage * (p - 1), onPage * p)
    setList(canShow)
    document.querySelectorAll(".page__number").forEach((num, n) => {
        num.classList.remove("active")
        if (n + 1 == p) {
            num.classList.add("active")
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        }
    });
}

document.querySelector("#search").onclick = (e) => {
    e.preventDefault()
    setFilters()
}
setFilters()

document.querySelector("#arrow-left").onclick = () => {
    if (page > 1) {
        page -= 1
        setPage(page)
    }
}

document.querySelector("#arrow-right").onclick = () => {
    
    if (page < document.querySelectorAll(".page__number").length) {
        page += 1
        setPage(page)
    }
}