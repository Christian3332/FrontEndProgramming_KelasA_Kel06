$(document).ready(function() {
    //Untuk toogle bar navigasi
    $('#mobile-menu').on('click', function() {
        $('.navbar').toggleClass('active');
    });
    });

    //popup kalau menu tidak ada di 
    const popupHTML = `
    <div id="custom-popup" class="popup-overlay">
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <div class="popup-icon">🍽️</div>
            <h3>Menu Tidak Ditemukan</h3>
            <p id="popup-message"></p>
            <button type="button" class="btn-primary" id="popup-btn-close" style="width: 100%; border: none; cursor: pointer; padding: 10px; border-radius: 6px;">Tutup</button>
        </div>
    </div>
    `;
    $('body').append(popupHTML);

    $('.popup-close, #popup-btn-close').on('click', function() {
        $('#custom-popup').fadeOut('fast');
    });

    $('#custom-popup').on('click', function(e) {
        if (e.target === this) {
            $(this).fadeOut('fast');
        }
    });

    // Carousel warung berganti dengan efek fade, tombol, atau otomatis.
    $(document).ready(function () {
        const carousel = document.querySelector('.carousel-container');
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.querySelectorAll('.carousel-slide'));
        const previousButton = carousel.querySelector('.prev-btn');
        const nextButton = carousel.querySelector('.next-btn');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const autoplayDelay = 4000;
        let autoplayTimer = null;
        let mouseIsOver = false;
        let currentSlideIndex = Math.max(0, slides.findIndex(function (slide) {
            return slide.classList.contains('is-active');
        }));

        if (slides.length < 2) return;

        function stopAutoplay() {
            window.clearTimeout(autoplayTimer);
            autoplayTimer = null;
        }

        function shouldPauseAutoplay() {
            return reducedMotion.matches || document.hidden || mouseIsOver || carousel.contains(document.activeElement);
        }

        function startAutoplay() {
            stopAutoplay();
            if (shouldPauseAutoplay()) return;

            autoplayTimer = window.setTimeout(function () {
                moveSlide(1);
                startAutoplay();
            }, autoplayDelay);
        }

        function showSlide(index) {
            currentSlideIndex = index;
            slides.forEach(function (slide, slideIndex) {
                const isActive = slideIndex === currentSlideIndex;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
            });
        }

        function moveSlide(direction) {
            const nextIndex = (currentSlideIndex + direction + slides.length) % slides.length;
            showSlide(nextIndex);
        }

        previousButton.addEventListener('click', function () {
            moveSlide(-1);
            startAutoplay();
        });

        nextButton.addEventListener('click', function () {
            moveSlide(1);
            startAutoplay();
        });

        carousel.addEventListener('pointerenter', function (event) {
            if (event.pointerType === 'mouse') {
                mouseIsOver = true;
                stopAutoplay();
            }
        });

        carousel.addEventListener('pointerleave', function (event) {
            if (event.pointerType === 'mouse') {
                mouseIsOver = false;
                startAutoplay();
            }
        });

        carousel.addEventListener('focusin', stopAutoplay);
        carousel.addEventListener('focusout', function (event) {
            if (!carousel.contains(event.relatedTarget)) startAutoplay();
        });

        track.addEventListener('keydown', function (event) {
            if (event.target !== track) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                moveSlide(event.key === 'ArrowRight' ? 1 : -1);
                startAutoplay();
            }
        });

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        reducedMotion.addEventListener('change', function () {
            if (reducedMotion.matches) stopAutoplay();
            else startAutoplay();
        });

        showSlide(currentSlideIndex);
        startAutoplay();
    });
    //data makanan yg ada untuk pengetesan
    const katalogMakanan = [
        'rawon setan', 'rawon',
        'nasi pecel', 'pecel',
        'tahu tek', 'tahu',
        'rujak cingur', 'rujak',
        'lontong kikil', 'kikil',
        'sate', 'sate klopo'
    ];

    $('.search-bar').on('submit', function(e) {
        e.preventDefault();

        let keyword = $(this).find('input[type="text"]').val().toLowerCase().trim();
        if (keyword === "") return;

        let isFound = katalogMakanan.some(function(menu) {
            return menu.includes(keyword);
        });
        //logika pencarian 
        if (isFound) {
            if (window.location.pathname.endsWith('katalog.html')) {
                $('html, body').animate({
                    scrollTop: $('.katalog-section').offset().top - 80
                }, 500);
            } else {
                window.location.href = 'katalog.html';
            }
        } else {
            $('#popup-message').html(`Maaf, kuliner <strong>"${keyword}"</strong> belum ada di katalog kami saat ini.`);
            $('#custom-popup').css('display', 'flex').hide().fadeIn('fast');
            
            // Mengosongkan input pencarian
            $(this).find('input[type="text"]').val('');
        }
    });
