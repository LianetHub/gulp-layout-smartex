"use strict";

document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', function (e) {
        const target = e.target;

        if (target.matches('.catalog__button')) {
            document.querySelector('.catalog').classList.toggle('catalog--active')
        }
    })

    // header catalog
    const categories = document.querySelectorAll('.catalog__category');

    if (categories.length) {
        const blocks = document.querySelectorAll('.catalog__block');
        categories?.forEach((category, index) => {
            category?.addEventListener('mouseenter', () => {

                blocks?.forEach(block => {
                    block.classList.remove('active');
                });

                if (blocks[index]) {
                    blocks[index].classList.add('active');
                }

                categories?.forEach(cat => {
                    const btn = cat.querySelector('.catalog__category-btn');
                    if (btn) {
                        btn.classList.remove('active');
                    }
                });
                const currentBtn = category.querySelector('.catalog__category-btn');
                if (currentBtn) {
                    currentBtn.classList.add('active');
                }
            });
        });

    }



    // sliders
    if (document.querySelector('.blog__slider')) {
        new Swiper('.blog__slider .swiper', {
            slidesPerView: 3,
            spaceBetween: 24,
            watchOverflow: true,
            navigation: {
                nextEl: '.blog__next',
                prevEl: '.blog__prev'
            }
        })
    }

    if (document.querySelector('.objects__slider')) {
        function initObjectsSlider() {
            const slider = document.querySelector('.objects__slider');

            if (!slider) return;

            const wrapper = slider.querySelector('.swiper-wrapper');

            if (window.innerWidth < 768) {
                const cards = wrapper.querySelectorAll('.object__card');

                wrapper.innerHTML = '';

                cards.forEach(card => {
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide');
                    slide.appendChild(card);
                    wrapper.appendChild(slide);
                });
            }

            new Swiper(slider, {
                spaceBetween: 24,
                watchOverflow: true,
                navigation: {
                    nextEl: '.objects__slider-next',
                    prevEl: '.objects__slider-prev'
                }
            });
        }

        initObjectsSlider();
        window.addEventListener('resize', () => {

            document.querySelector('.objects__slider')?.swiper?.destroy(true, true);
            initObjectsSlider();
        });

    }

    if (document.querySelectorAll('.marquee__slider').length) {
        document.querySelectorAll('.marquee__slider')?.forEach((marqueeSlider, index) => {
            const direction = index % 2 === 1 ? 'reverse' : 'normal';

            new Swiper(marqueeSlider, {
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 24,
                observer: true,
                observeParents: true,
                freeMode: true,
                allowTouchMove: false,
                speed: 10000,
                autoplay: {
                    delay: 1,
                    freeModeMomentum: false,
                    disableOnInteraction: false,
                    reverseDirection: direction === 'reverse'
                },
            });
        })
    }


})


