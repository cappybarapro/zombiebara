// Плавна прокрутка для навігаційних посилань
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Фіксація хедера при прокрутці
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Прокрутка вниз
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Прокрутка вгору
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', function() {
    const viewport = document.querySelector('.slides_viewport');

    if(!viewport) { return }

    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slides_dots');
    let currentSlide = 0;
    let autoplayInterval;
    let isMouseOver = false;

    // Create dots navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slide-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slide-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        viewport.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function startAutoplay() {
        if (!isMouseOver) {
            autoplayInterval = setInterval(nextSlide, 4000);
        }
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Stop Slide on mouse over viewport
    viewport.addEventListener('mouseenter', () => {
        isMouseOver = true;
        stopAutoplay();
    });

    viewport.addEventListener('mouseleave', () => {
        isMouseOver = false;
        startAutoplay();
    });

    // Stop Slide on mouse over dots
    dotsContainer.addEventListener('mouseenter', () => {
        isMouseOver = true;
        stopAutoplay();
    });

    dotsContainer.addEventListener('mouseleave', () => {
        isMouseOver = false;
        startAutoplay();
    });

    // Init Slider Actions
    startAutoplay();
});

// Init sandwich mobile menu item
document.addEventListener('DOMContentLoaded', function() {
    const sandwich = document.querySelector('.sandwich');

    if (!sandwich) { return; }

    sandwich.addEventListener('click', function() {
        this.classList.toggle('opened');
    });
});

// FAQs
document.addEventListener('DOMContentLoaded', function() {
    const faqs = document.querySelectorAll('.faqs .faq');

    if (!faqs) { return; }

    for(var i = 0; i < faqs.length; i++) {
        let title = faqs[i].querySelector('h4');
        let expandCollapse = faqs[i].querySelector('.faq-expand-collapse');

        [title, expandCollapse].map(el => {
            el.addEventListener("click",(e) => {
                e.target.parentNode.classList.toggle('expanded')
            });
        });
    }
});
