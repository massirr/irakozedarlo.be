/* Hamburger page menu: open, close on pick, Escape or outside click. */
(function () {
    'use strict';
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('page-menu');
    if (!toggle || !menu) return;

    function setMenu(open) {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setMenu(menu.hidden);
    });
    menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('click', function (e) {
        if (!menu.hidden && !menu.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !menu.hidden) {
            setMenu(false);
            toggle.focus();
        }
    });
})();
