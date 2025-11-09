// header
document.addEventListener("DOMContentLoaded", function(event) {
    let menuBtn = document.querySelectorAll('.header .menu-list .menu-btn')
        subMenuBackBtn = document.querySelectorAll('.header .menu-list .sub-menu .back-btn')
        modalOverlay = document.querySelector('.modal-overlay')
        body = document.querySelector('body')
        subMenu = document.querySelectorAll('.header .menu-list .sub-menu')
        burger = document.querySelector('.burger')
        menulist = document.querySelector('.header .menu-list')

    document.addEventListener('click', (e) => {
        subMenu.forEach(element => {
            const withinBoundaries1 = e.composedPath().includes(menulist);
            const withinBoundaries2 = e.composedPath().includes(element);

            if (!withinBoundaries1 && !withinBoundaries2) {
                menuBtn.forEach(el => {
                    el.classList.remove('active')
                });
                modalOverlay.classList.remove('active')
                body.classList.remove('freeze')
            }
        });


    })

    burger.addEventListener('click', () => {
        window.scrollTo(0, 0);
        burger.classList.toggle('active')
        menulist.classList.toggle('active')
        body.classList.toggle('freeze')
        modalOverlay.classList.toggle('active')
        menuBtn.forEach(el => {
            el.classList.remove('active')
        });
    })

    menuBtn.forEach(element => {
        element.addEventListener('click', () => {
            window.scrollTo(0, 0);

            if (!element.classList.contains('active')) {
                menuBtn.forEach(el => {
                    el.classList.remove('active')
                });
                element.classList.add('active')
                modalOverlay.classList.add('active')
                body.classList.add('freeze')
            } else {
                menuBtn.forEach(el => {
                    el.classList.remove('active')
                });
                element.classList.remove('active')
                modalOverlay.classList.remove('active')
                body.classList.remove('freeze')
            }

        })
    });

    subMenuBackBtn.forEach(element => {
        element.addEventListener('click', () => {
            element.parentNode.previousElementSibling.classList.remove('active')
        })
    });

    modalOverlay.addEventListener('click', () => {
        menuBtn.forEach(el => {
            el.classList.remove('active')
        });
        modalOverlay.classList.remove('active')
        body.classList.remove('freeze')
    })

    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 27) {
            menuBtn.forEach(el => {
                el.classList.remove('active')
            });
            modalOverlay.classList.remove('active')
            body.classList.remove('freeze')
        }
    });
})

// cookie
document.addEventListener("DOMContentLoaded", function(event) {
    let cookie = document.querySelector('.cookie')
        cookieBtn = document.querySelector('.cookie .btn')

    cookieBtn.addEventListener('click', () => {
        cookie.remove()
    })
})
// top
document.addEventListener("DOMContentLoaded", function(event) {
    const swiper = new Swiper('.top-slider', {
        loop: true,
        effect: 'fade',
        slidesPerView: 1,
        autoplay: {
            delay: 6000,
        },
        navigation: {
            nextEl: '.top-slider-button-next',
            prevEl: '.top-slider-button-prev',
        },
        pagination: {
            el: '.top-slider-pagination',
            clickable: true,
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' + ' - ' + '<span class="' + totalClass + '"></span>';
            },
        },
    });
})

// friends
document.addEventListener("DOMContentLoaded", function(event) {
    const swiper = new Swiper('.friends-slider', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.friends-slider-button-next',
            prevEl: '.friends-slider-button-prev',
        },
        pagination: {
            el: '.friends-slider-pagination',
            clickable: true,
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' + ' - ' + '<span class="' + totalClass + '"></span>';
            },
        },
        breakpoints: {
            1440: {
                spaceBetween: 24,
            }
        }
    });
})

// who-we-help
document.addEventListener("DOMContentLoaded", function(event) {
    let tabs = document.querySelectorAll('.who-we-help .tabs-wrapper .tabs-list li')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(element => {
                element.classList.remove('active')
            });
            tab.classList.add('active')
        })
    });
})

document.addEventListener("DOMContentLoaded", function(event) {
    const breakpoint = window.matchMedia( '(min-width: 1200px)' );

    let mySwiper;

    const breakpointChecker = function() {
        if ( breakpoint.matches === true ) {
            if ( mySwiper !== undefined ) mySwiper.destroy( true, true );
            return;
        } else if ( breakpoint.matches === false ) {
            return enableSwiper();
        }
    };

    const enableSwiper = function() {
        mySwiper = new Swiper ('.help-slider', {
            spaceBetween: 8,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.help-slider-button-next',
                prevEl: '.help-slider-button-prev',
            },
            breakpoints: {
                601: {
                    spaceBetween: 24,
                },
            }
        });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
});