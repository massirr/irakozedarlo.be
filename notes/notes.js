/* Reading-notes helper: remembers ticks and answer notes in this browser only. */
(function () {
    'use strict';

    var STORE_KEY = 'hacking-ai-class-1-notes';
    var state = { checks: {}, notes: {} };

    function load() {
        try {
            var raw = window.localStorage.getItem(STORE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                state.checks = parsed.checks || {};
                state.notes = parsed.notes || {};
            }
        } catch (e) { /* storage blocked or corrupt: start empty */ }
    }

    function save() {
        try {
            window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
        } catch (e) { /* ignore */ }
    }

    var boxes = Array.prototype.slice.call(document.querySelectorAll('input[data-check]'));
    var areas = Array.prototype.slice.call(document.querySelectorAll('textarea[data-note]'));

    function updateProgress() {
        var core = boxes.filter(function (b) { return b.hasAttribute('data-core'); });
        var done = core.filter(function (b) { return b.checked; }).length;
        var count = document.querySelector('[data-progress-count]');
        var total = document.querySelector('[data-progress-total]');
        if (count) count.textContent = done;
        if (total) total.textContent = core.length;

        document.querySelectorAll('.note-article').forEach(function (article) {
            var label = article.querySelector('[data-article-progress]');
            if (!label) return;
            var own = Array.prototype.slice.call(article.querySelectorAll('input[data-core]'));
            var read = own.filter(function (b) { return b.checked; }).length;
            label.textContent = '(' + read + ' of ' + own.length + ' read)';
        });
    }

    load();

    boxes.forEach(function (box) {
        var key = box.getAttribute('data-check');
        box.checked = !!state.checks[key];
        box.addEventListener('change', function () {
            if (box.checked) { state.checks[key] = true; } else { delete state.checks[key]; }
            save();
            updateProgress();
        });
    });

    var timer = null;
    areas.forEach(function (area) {
        var key = area.getAttribute('data-note');
        if (state.notes[key]) area.value = state.notes[key];
        area.addEventListener('input', function () {
            state.notes[key] = area.value;
            clearTimeout(timer);
            timer = setTimeout(save, 300);
        });
    });

    updateProgress();

    // Copy notes
    var copyBtn = document.getElementById('copy-notes');
    var status = document.getElementById('copy-status');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var parts = areas
                .filter(function (a) { return a.value.trim(); })
                .map(function (a) { return a.getAttribute('data-label') + '\n' + a.value.trim(); });
            if (!parts.length) {
                if (status) status.textContent = 'Nothing to copy yet.';
                return;
            }
            var text = parts.join('\n\n');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () {
                    if (status) status.textContent = 'Copied.';
                }, function () {
                    if (status) status.textContent = 'Copy blocked by the browser. Select the text and copy it by hand.';
                });
            } else if (status) {
                status.textContent = 'Copy is not available here. Select the text and copy it by hand.';
            }
        });
    }

    // Highlight the nav link for the section in view
    var links = document.querySelectorAll('.nav-menu a[href^="#"]');
    var sections = Array.prototype.slice.call(links).map(function (l) {
        return document.querySelector(l.getAttribute('href'));
    });
    function onScroll() {
        var y = window.scrollY + 120;
        var current = null;
        sections.forEach(function (s) { if (s && s.offsetTop <= y) current = s.id; });
        links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
