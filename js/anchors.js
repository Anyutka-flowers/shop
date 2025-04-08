document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    scrollTo({
        top:document.querySelector(this.getAttribute('href')).getBoundingClientRect().top - 150,
        behavior:"smooth"
    })
    // document.querySelector(this.getAttribute('href')).scrollIntoView({
    //     behavior: 'smooth'
    // });
    });
});