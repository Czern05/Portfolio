(() => {
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeLabel = document.querySelector('.theme-label');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const sections = [...document.querySelectorAll('main section[id]')];
    const backToTop = document.querySelector('.back-to-top');

    const applyThemeLabel = () => {
        const isDark = root.dataset.theme === 'dark';
        if (themeIcon) themeIcon.textContent = isDark ? '☼' : '◐';
        if (themeLabel) themeLabel.textContent = isDark ? 'Light' : 'Dark';
        if (themeToggle) themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    applyThemeLabel();

    themeToggle?.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        localStorage.setItem('portfolio-theme', next);
        applyThemeLabel();
    });

    menuToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navAnchors.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle?.setAttribute('aria-expanded', 'false');
            menuToggle?.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) {
            navLinks?.classList.remove('open');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    const updateBackToTop = () => {
        backToTop?.classList.toggle('visible', window.scrollY > 100);
    };

    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navAnchors.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
            });
        }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });

        sections.forEach((section) => navObserver.observe(section));
    } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    }
})();
