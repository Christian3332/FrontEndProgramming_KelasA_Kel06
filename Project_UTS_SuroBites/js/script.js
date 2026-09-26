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