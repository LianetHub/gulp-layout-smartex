"use strict";


// init Fancybox

if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeClick: "outside",
    });
}


document.addEventListener("DOMContentLoaded", function () {



    document.addEventListener('click', function (e) {
        const target = e.target

        // =========== сatalog =================

        const catalog = document.querySelector('.catalog')
        const catalogCategories = document.querySelector('.catalog__categories')
        const catalogBody = document.querySelector('.catalog__body')
        const catalogCurrent = document.querySelector('.catalog__current')
        const blocks = document.querySelectorAll('.catalog__block')

        const closeCatalog = () => {
            document.querySelectorAll('[data-catalog-toggler]').forEach(catalogTogglerBtn => catalogTogglerBtn.classList.remove('active'))
            catalog.classList.remove('catalog--active')
            document.body.classList.remove('lock-catalog')
        }

        if (target.matches('[data-catalog-toggler]')) {
            document.querySelectorAll('[data-catalog-toggler]').forEach(catalogTogglerBtn => catalogTogglerBtn.classList.toggle('active'))
            catalog.classList.toggle('catalog--active')
            document.body.classList.toggle('lock-catalog')
        }

        if (target.matches('.catalog__close')) {
            closeCatalog()
        }

        if (target.matches('.catalog__category-btn')) {
            if (window.innerWidth < 991.98) {
                catalogCategories.classList.add('catalog__categories--hidden')
                catalogBody.classList.add('catalog__body--visible')
                catalogCurrent.textContent = target.textContent

                blocks.forEach(block => {
                    block.classList.remove('active')
                })

                const categoryIndex = Array.from(target.closest('.catalog__categories').querySelectorAll('.catalog__category')).findIndex(cat => cat.contains(target))
                if (blocks[categoryIndex]) {
                    blocks[categoryIndex].classList.add('active')
                }
            }
        }

        if (target.matches('.catalog__brand-caption')) {
            if (window.innerWidth < 991.98) {
                const currentBlock = target.closest('.catalog__block')
                const currentBrand = target.closest('.catalog__brand')

                if (currentBlock) {
                    currentBlock.classList.add('catalog__block--submenu-active')
                }

                currentBrand.classList.add('active')
                catalogCurrent.textContent = target.textContent
            }
        }

        if (target.matches('.catalog__back')) {
            const activeBlock = catalogBody.querySelector('.catalog__block.active')

            if (activeBlock && activeBlock.classList.contains('catalog__block--submenu-active')) {

                activeBlock.classList.remove('catalog__block--submenu-active')
                const activeBrand = activeBlock.querySelector('.catalog__brand.active')
                if (activeBrand) {
                    activeBrand.classList.remove('active')
                }
                const activeCategoryBtn = catalogCategories.querySelector('.catalog__category-btn.active')
                if (activeCategoryBtn) {
                    catalogCurrent.textContent = activeCategoryBtn.textContent
                }
            } else if (catalogCategories.classList.contains('catalog__categories--hidden')) {

                catalogCategories.classList.remove('catalog__categories--hidden')
                catalogBody.classList.remove('catalog__body--visible')
                catalogCurrent.textContent = 'Каталог товаров'
                blocks.forEach(block => {
                    block.classList.remove('active')
                })
            } else {

                closeCatalog()
            }
        }
        // ========= catalog =========

        if (target.matches('.footer__caption')) {
            if (window.innerWidth < 991.98) {

                const content = target.nextElementSibling;

                if (content && content.matches('.footer__accordion')) {
                    target.classList.toggle('footer__caption--active');
                    content.slideToggle()
                }
            }
        }


    })

    // catalog desktop mouse events
    const categories = document.querySelectorAll('.catalog__category')

    if (categories.length) {
        const blocks = document.querySelectorAll('.catalog__block')
        categories?.forEach((category, index) => {
            category?.addEventListener('mouseenter', () => {

                blocks?.forEach(block => {
                    block.classList.remove('active')
                })

                if (blocks[index]) {
                    blocks[index].classList.add('active')
                }

                categories?.forEach(cat => {
                    const btn = cat.querySelector('.catalog__category-btn')
                    if (btn) {
                        btn.classList.remove('active')
                    }
                })
                const currentBtn = category.querySelector('.catalog__category-btn')
                if (currentBtn) {
                    currentBtn.classList.add('active')
                }
            })
        })
    }


    // sliders

    if (document.querySelectorAll('.benefits__content')) {
        document.querySelectorAll('.benefits__content')?.forEach(benefitsSlider => {

            const scrollBar = benefitsSlider.querySelector('.benefits__scrollbar');

            initializeConditionalSwiper(benefitsSlider, {
                watchOverflow: true,
                spaceBetween: 12,
                slidesPerView: "auto",
                scrollbar: {
                    el: scrollBar,
                },
            })
        })
    }

    if (document.querySelector('.about__menu')) {
        const menuContainer = document.querySelector('.about__menu');
        const activeItem = menuContainer.querySelector('.about__menu-item.active');
        const allItems = menuContainer.querySelectorAll('.about__menu-item');

        let initialIndex = 0;

        if (activeItem) {
            initialIndex = Array.from(allItems).indexOf(activeItem);

            if (initialIndex === -1) {
                initialIndex = 0;
            }
        }

        initializeConditionalSwiper('.about__menu', {
            watchOverflow: true,
            spaceBetween: 8,
            slidesPerView: "auto",
            initialSlide: initialIndex,
        }, 991.98);
    }

    if (document.querySelector('.objects__categories')) {

        new Swiper('.objects__categories', {
            watchOverflow: true,
            spaceBetween: 8,
            slidesPerView: "auto",
        });
    }

    if (document.querySelector('.product__categories-slider')) {

        new Swiper('.product__categories-slider', {
            watchOverflow: true,
            spaceBetween: 20,
            slidesPerView: 1,
            navigation: {
                nextEl: '.product__categories-next',
                prevEl: '.product__categories-prev'
            },
            scrollbar: {
                el: ".product__categories-scrollbar",
            },
            breakpoints: {
                991.98: {
                    slidesPerView: "auto",
                }
            }
        });
    }
    if (document.querySelector('.product__categories-more-slider')) {

        new Swiper('.product__categories-more-slider', {
            watchOverflow: true,
            spaceBetween: 20,
            slidesPerView: "auto",
            navigation: {
                nextEl: '.product__categories-next',
                prevEl: '.product__categories-prev'
            },
            scrollbar: {
                el: ".product__categories-scrollbar",
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 2,
                },
                991.98: {
                    slidesPerView: 3,
                },
                1199.98: {
                    slidesPerView: 4,

                }
            }
        });
    }

    if (document.querySelector('.blog__slider')) {
        new Swiper('.blog__slider .swiper', {
            slidesPerView: "auto",
            spaceBetween: 8,
            watchOverflow: true,
            navigation: {
                nextEl: '.blog__next',
                prevEl: '.blog__prev'
            },
            breakpoints: {
                575.98: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                991.98: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                }
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
                spaceBetween: 12,
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
                breakpoints: {
                    767.98: {
                        spaceBetween: 24,
                    }
                }
            });
        })
    }

    if (document.querySelector('.reviews__items')) {
        initializeConditionalSwiper('.reviews__items', {
            watchOverflow: true,
            spaceBetween: 12,
            slidesPerView: 1.05,

        }, 991.98)
    }

    if (document.querySelector('.certs-slider')) {
        new Swiper('.certs-slider', {
            slidesPerView: "auto",
            spaceBetween: 8,
            watchOverflow: true,
            pagination: {
                type: "progressbar",
                el: ".certs-slider__progress"
            },
            breakpoints: {
                767.98: {
                    spaceBetween: 12,
                }
            }
        })
    }

    if (document.querySelector('.partners-slider')) {
        new Swiper('.partners-slider', {
            slidesPerView: "auto",
            spaceBetween: 8,
            watchOverflow: true,
            grabCursor: true,
            scrollbar: {
                el: ".partners-slider__scrollbar"
            },
            breakpoints: {
                767.98: {
                    spaceBetween: 12,
                }
            }
        })
    }



    function initializeConditionalSwiper(sliderSelector, swiperOptions, maxWidth = 575.98) {
        let isInitialized = false;
        let swiperInstance = null;

        function handleSwiperInitialization() {
            if (window.innerWidth <= maxWidth) {
                if (!isInitialized) {
                    isInitialized = true;
                    swiperInstance = new Swiper(sliderSelector, swiperOptions);
                }
            } else if (isInitialized) {
                swiperInstance.destroy(true, true);
                swiperInstance = null;
                isInitialized = false;
            }
        }
        handleSwiperInitialization();
        window.addEventListener("resize", handleSwiperInitialization);

        return {
            destroy: () => {
                window.removeEventListener("resize", handleSwiperInitialization);
                if (isInitialized && swiperInstance) {
                    swiperInstance.destroy(true, true);
                }
            }
        };
    }


    // floating Labels
    const formControls = document.querySelectorAll('.form__field > .form__control');

    const toggleInputClass = (element) => {
        if (element.value.length > 0) {
            element.classList.add('_input');
        } else {
            element.classList.remove('_input');
        }
    };

    formControls?.forEach(control => {
        toggleInputClass(control);

        const events = ['input', 'blur', 'focus', 'change', 'keyup', 'mouseup'];
        events.forEach(event => {
            control.addEventListener(event, () => toggleInputClass(control));
        });
    });

    formControls?.forEach(control => {
        control.addEventListener('animationstart', (e) => {
            if (e.animationName === 'onAutoFillStart' || e.animationName === 'onAutoFillCancel') {
                control.classList.add('_input');
            }
        });
    });


})

//  init slide toggle

HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {
    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    const elStyles = window.getComputedStyle(el);

    const elHeight = parseFloat(elStyles.getPropertyValue('height'));
    const elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    const elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    const elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    const elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    const stepHeight = elHeight / duration;
    const stepPaddingTop = elPaddingTop / duration;
    const stepPaddingBottom = elPaddingBottom / duration;
    const stepMarginTop = elMarginTop / duration;
    const stepMarginBottom = elMarginBottom / duration;

    let start;

    function step(timestamp) {
        if (start === undefined) start = timestamp;

        const elapsed = timestamp - start;

        if (isDown) {
            el.style.height = `${stepHeight * elapsed}px`;
            el.style.paddingTop = `${stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${stepMarginBottom * elapsed}px`;
        } else {
            el.style.height = `${elHeight - stepHeight * elapsed}px`;
            el.style.paddingTop = `${elPaddingTop - stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${elPaddingBottom - stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${elMarginTop - stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${elMarginBottom - stepMarginBottom * elapsed}px`;
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === "function") callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}