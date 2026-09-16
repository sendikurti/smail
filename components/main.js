//mobile menu
document.addEventListener('partialsLoaded', function () {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const openBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('mobileCloseBtn');

    if (!menu || !overlay || !openBtn || !closeBtn) return;

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


// header servizi dropdown
document.addEventListener('partialsLoaded', function () {
    const wrapper = document.querySelector('.dropdown-wrapper');
    const btn = document.getElementById('serviziDropdownBtn');

    if (!wrapper || !btn) return;

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


// custom selects (used on Contatti page, safe to skip elsewhere)
document.addEventListener('DOMContentLoaded', function () {
    const customSelects = document.querySelectorAll('.custom-select');
    if (customSelects.length === 0) return;

    customSelects.forEach(select => {
        const trigger = select.querySelector('.custom-select-trigger');
        const options = select.querySelectorAll('.custom-select-option');
        const label = select.querySelector('.custom-select-trigger span');
        const hiddenInput = select.nextElementSibling;

        if (!trigger || !label || !hiddenInput) return;

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


//animation
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120
    });
}


//contatti form (only runs if the form exists on this page)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contatti-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const privacyCheck = document.getElementById('privacyCheck');

    if (!submitBtn || !privacyCheck) return;

    privacyCheck.addEventListener('change', function () {
        submitBtn.disabled = !privacyCheck.checked;
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
        let hasError = false;

        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('field-error');
                hasError = true;
            } else {
                input.classList.remove('field-error');
            }
        });

        const tipoServizio = document.getElementById('tipoServizioSelect');
        const tipoServizioValue = document.getElementById('tipoServizioValue');
        if (tipoServizio && tipoServizioValue) {
            if (!tipoServizioValue.value) {
                tipoServizio.classList.add('field-error');
                hasError = true;
            } else {
                tipoServizio.classList.remove('field-error');
            }
        }

        if (hasError) {
            return;
        }

        form.submit();
    });

    requiredFieldsClearErrorOnInput(form);
});

function requiredFieldsClearErrorOnInput(form) {
    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        input.addEventListener('input', function () {
            if (input.value.trim()) {
                input.classList.remove('field-error');
            }
        });
    });

    document.querySelectorAll('.custom-select-option').forEach(option => {
        option.addEventListener('click', function () {
            const parentSelect = option.closest('.custom-select');
            parentSelect.classList.remove('field-error');
        });
    });
}


//footer select  + scroll 
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const selectedServizio = params.get('servizio');

    if (!selectedServizio) return;

    const targetBox = document.querySelector(`.pulizie-box[data-servizio="${selectedServizio}"], .interventi[data-servizio="${selectedServizio}"]`);
    if (!targetBox) return;

    targetBox.classList.add('servizio-selected');

    setTimeout(() => {
        const headerOffset = 100;
        const elementPosition = targetBox.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }, 100);
});



document.addEventListener('partialsLoaded', function () {
    document.querySelectorAll('.header-call-to-action-1, .header-call-to-action-2').forEach(button => {
        button.addEventListener('mousemove', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
});