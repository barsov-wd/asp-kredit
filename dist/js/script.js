const problemsSlider = new Swiper('.reviews-slider', {
    direction: 'vertical',
    mousewheel: true,
    slidesPerView: 1,
    loop: true,
    // centeredSlides: true
    pagination: {
        el: '.for-whom__pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.reviews-button-next',
        prevEl: '.reviews-button-prev',
    },
    // breakpoints: {
        // 300: {
        //     slidesPerView: 1,
        //     spaceBetween: 20,
        //     autoHeight: true,
        // },
        // 769: {
        //     spaceBetween: 30,
        // },
        // 1250: {
        //     spaceBetween: 50,
        // }
    // }
});

// burger
const burger = document.querySelector('.header__burger');
const menuElem = document.querySelector('.menu');
const menuClose = document.querySelectorAll('[data-menuClose]');

burger.addEventListener('click', () => {
    menuElem.classList.add('menu--active')
    document.body.style.overflow = 'hidden';
});

menuClose.forEach(item => {
    item.addEventListener('click', () => {
        menuElem.classList.remove('menu--active')
        document.body.style.overflow = '';
    })
});

menuElem.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu')) {
        menuElem.classList.remove('menu--active')
        document.body.style.overflow = '';
    }
});