document.addEventListener('partialsLoaded', function () {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const openBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('mobileCloseBtn');

    function openMenu() {
        menu.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
});

document.addEventListener('partialsLoaded', function () {
    const wrapper = document.querySelector('.dropdown-wrapper');
    const btn = document.getElementById('serviziDropdownBtn');

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        wrapper.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.custom-select').forEach(select => {
        const trigger = select.querySelector('.custom-select-trigger');
        const options = select.querySelectorAll('.custom-select-option');
        const label = select.querySelector('.custom-select-trigger span');
        const hiddenInput = select.nextElementSibling;

        trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            select.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', function () {
                label.textContent = option.textContent;
                hiddenInput.value = option.dataset.value;
                select.classList.remove('open');
            });
        });
    });

    document.addEventListener('click', function (e) {
        document.querySelectorAll('.custom-select.open').forEach(select => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    });
});