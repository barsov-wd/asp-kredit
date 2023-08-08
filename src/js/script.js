window.addEventListener('DOMContentLoaded', () => {
    const howSlider = new Swiper('.how-slider', {
        slidesPerView: 4,
        spaceBetween: 15,
        // centeredSlides: true
        navigation: {
            nextEl: '.how-button-next',
            prevEl: '.how-button-prev',
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            577: {
                slidesPerView: '1.3',
                spaceBetween: 15,
            },
            991: {
                slidesPerView: '2.3',
                spaceBetween: 15,
            },
            1400: {
                slidesPerView: 4
            },
        }
    });

    const getSlider = new Swiper('.get-slider', {
        slidesPerView: 4,
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: '.get-button-next',
            prevEl: '.get-button-prev',
        },
        grid: {
            rows: 2,
            fill: 'row',
        },
        breakpoints: {
            300: {
                slidesPerView: 'auto',
                spaceBetween: 15,
                grid: {
                    rows: 1,
                    fill: 'row',
                },
            },
            577: {
                slidesPerView: 'auto',
                grid: {
                    rows: 1,
                    fill: 'row',
                },
            },
            1200: {
                slidesPerView: 4,
                grid: {
                    rows: 2,
                    fill: 'row',
                },
            }
        }
    });

    const problemsSlider = new Swiper('.reviews-slider', {
        slidesPerView: 1,
        // centeredSlides: true
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            clickable: true
        },
        navigation: {
            nextEl: '.reviews-button-next',
            prevEl: '.reviews-button-prev'
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                el: '.swiper-pagination',
                direction: 'horizontal',
                spaceBetween: 20,
                pagination: {
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                }
            },
            768: {
                direction: 'horizontal',
                slidesPerView: '1.7',
                spaceBetween: 20,
                pagination: {
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                }
            },
            991: {
                direction: 'horizontal',
                slidesPerView: '1.7',
                spaceBetween: 20,
                pagination: {
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                }
            },
            1100: {
                direction: 'vertical',
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                    clickable: true
                }
            },
        }
    });

    const footerSlider = new Swiper('.footer-slider', {
        slidesPerView: 8,
        spaceBetween: 75,
        loop: true,
        speed: 5000,
        autoplay: {
            enabled: true,
            delay: 1,
        },
        breakpoints: {
             300: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 4
            },
            1100: {
                slidesPerView: 6
            },
            1400: {
                slidesPerView: 8
            }
        }
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

    // range, calc

    // маска
    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    // вычисление платежа
    function getPayment(sum, period, rate) {
        // *
        // * sum - сумма кредита
        // * period - срок в годах
        // * rate - годовая ставка в процентах
        // *
        let i,
            koef,
            payment;

        // ставка в месяц
        i = (rate / 12) / 100;

        // коэффициент аннуитета
        koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

        // итог
        payment = (sum * koef).toFixed();
        return prettify(payment);
    };

    function correctWordYear(val) {
        switch (val) {
            case 1:
                return 'год'
            case 2:
                return 'года'
            case 3:
                return 'года'
            case 4:
                return 'года'
            default:
                return 'лет'
        }
    }

    function range(rangeInputSum_, rangeTrackSum_, rangeInputTerm_, rangeTrackTerm_, inputSum_, inputTerm_, resultField, textYear_) {
        const rangeInputSum = document.querySelector(rangeInputSum_),
            rangeTrackSum = document.querySelector(rangeTrackSum_),
            rangeInputTerm = document.querySelector(rangeInputTerm_),
            rangeTrackTerm = document.querySelector(rangeTrackTerm_),
            inputSum = document.querySelector(inputSum_),
            inputTerm = document.querySelector(inputTerm_),
            result = document.querySelector(resultField),
            textYear = document.querySelector(textYear_);


        let minSum = +rangeInputSum.getAttribute('min'),
            maxSum = +rangeInputSum.getAttribute('max'),
            stepSum = +rangeInputSum.getAttribute('step'),
            minTerm = +rangeInputTerm.getAttribute('min'),
            maxTerm = +rangeInputTerm.getAttribute('max'),
            stepTerm = +rangeInputTerm.getAttribute('step');

        rangeInputSum.addEventListener('input', function () {
            let position = 100 / (maxSum - stepSum) * (this.value - stepSum);

            rangeTrackSum.style.width = `${position}%`;
            inputSum.value = prettify(this.value);

            if (inputTerm.value < minTerm) {
                result.textContent = '-'
                return
            }

            result.textContent = getPayment(this.value, rangeInputTerm.value, 8.9) + ' ₽'
        });

        rangeInputTerm.addEventListener('input', function () {
            let position = 100 / (maxTerm - stepTerm) * (this.value - stepTerm);

            rangeTrackTerm.style.width = `${position}%`;
            inputTerm.value = this.value;
            textYear.textContent = correctWordYear(+this.value)

            if (inputSum.value.replace(/\D/g, '') < minSum) {
                result.textContent = '-'
                return
            }

            result.textContent = getPayment(rangeInputSum.value, this.value, 8.9) + ' ₽'
        });

        inputSum.addEventListener('input', function () {
            this.value = prettify(this.value.replace(/\D/g, ''))
            if (this.value.replace(/\D/g, '') > maxSum) {
                this.value = prettify(maxSum)
            }
            if (this.value.replace(/\D/g, '') < minSum) {
                rangeInputSum.value = 0
                result.textContent = '-'
                rangeTrackSum.style.width = 0 + '%'
                return
            }
            if (this.value.replace(/\D/g, '') >= minSum && this.value.replace(/\D/g, '') <= maxSum) {
                rangeTrackSum.style.width = `${100 / (maxSum - stepSum) * (this.value.replace(/\D/g, '') - stepSum)}%`;
                rangeInputSum.value = this.value.replace(/\D/g, '')
            }
            if (inputTerm.value < minTerm) {
                result.textContent = '-'
                return
            }
            result.textContent = getPayment(rangeInputSum.value, rangeInputTerm.value, 8.9) + ' ₽'
        })

        inputTerm.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '')
            if (this.value > maxTerm) {
                this.value = maxTerm
            }
            if (this.value < minTerm) {
                rangeInputTerm.value = 0
                result.textContent = '-'
                rangeTrackTerm.style.width = 0 + '%'
                return
            }
            if (this.value >= minTerm && this.value <= maxTerm) {
                rangeTrackTerm.style.width = `${100 / (maxTerm - stepTerm) * (this.value - stepTerm)}%`;
                rangeInputTerm.value = this.value
                rangeInputTerm.value = this.value
                textYear.textContent = correctWordYear(+this.value)
            }
            if (inputSum.value.replace(/\D/g, '') < minSum) {
                result.textContent = '-'
                return
            }
            result.textContent = getPayment(rangeInputSum.value, rangeInputTerm.value, 8.9) + ' ₽'
        })
    }

    range(".calc__range__input--1", ".calc__range__track--1", ".calc__range__input--2", ".calc__range__track--2", ".calc__field--1", ".calc__field--2", '.calc__form-result-text--res', ".calc__field__text--year");


    // функция для модалки

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
            modal_ = document.querySelector(modal),
            modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });

            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal__container')) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal-main', 'modal--active', '[data-modal]', '.modal-main__close');

});
    