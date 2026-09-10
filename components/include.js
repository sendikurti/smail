async function loadPartial(id, url) {
    const res = await fetch(url);
    const html = await res.text();
    document.getElementById(id).outerHTML = html;
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadPartial('header-placeholder', '/components/header.html'),
        loadPartial('mobile-menu-placeholder', '/components/menu.html'),
        loadPartial('footer-placeholder', '/components/footer.html')
    ]);

    // fire a custom event once partials are in the DOM,
    // so main.js knows it's safe to attach listeners
    document.dispatchEvent(new Event('partialsLoaded'));
});