const reviews__list = document.querySelector(".reviews__list")

reviews__list.innerHTML = reviews.map(review =>
    `<div class="review">
        <div class="review__top">
            <p class="review__name">${review.name}</p>
            <div class="review__rating">
                ${[...Array(6).keys()].slice(1).map(n =>
        `<img class="rating__star" src="img/icons/star${n <= review.rating ? "" : " grey"}.svg" alt="">`
    ).join("")}
            </div>
        </div>
        <h5>Отзыв:</h5>
        <div class="review__text">
            ${review.text}
        </div>
    </div>`
).join("")


let rating = 0

document.querySelectorAll(".add-review__star").forEach((star, n) => {
    star.onclick = () => {
        document.querySelectorAll(".add-review__star").forEach((s, i) => {
            s.src = "img/icons/star.svg"
            if (i > n) {
                s.src = "img/icons/star grey.svg"
            }
        });
        rating = n + 1
    }
});


document.querySelector("#send-review").onclick = (e) => {
    e.preventDefault()
    let name = document.querySelector("#name")
    let text = document.querySelector("#text")
    if (rating != 0 && name.value && text.value) {
        reviews__list.innerHTML = `<div class="review">
            <div class="review__top">
                <p class="review__name">${name.value}</p>
                <div class="review__rating">
                    ${[...Array(6).keys()].slice(1).map(n =>
            `<img class="rating__star" src="img/icons/star${n <= rating ? "" : " grey"}.svg" alt="">`
        ).join("")}
                </div>
            </div>
            <h5>Отзыв:</h5>
            <div class="review__text">
                ${text.value}
            </div>
        </div>` + reviews__list.innerHTML
        rating = 0

        document.querySelectorAll(".add-review__star").forEach(star => {
            star.src = "img/icons/star grey.svg"
        })
        name.value = ""
        text.value = ""
    } else {
        alert("Заполните все поля")
    }
}
