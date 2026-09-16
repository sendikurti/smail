const servicesSwiper = new Swiper('.services-swiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
        nextEl: '.services-next',
        prevEl: '.services-prev',
        disabledClass: 'swiper-button-disabled'
    },
    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 16 },
        576: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
    }
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isActive = item.classList.contains('active');
        const icon = question.querySelector('.faq-toggle img');

        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.faq-toggle img').src = '/images/plus.svg';
        });

        if (!isActive) {
            item.classList.add('active');
            icon.src = '/images/cross.svg';
        }
    });
});