const sectionTitles = {
    dashboard: 'Dashboard',
    makanan: 'Kelola Makanan',
    rekomendasi: 'Kelola Rekomendasi',
    warung: 'Kelola Warung',
    faq: 'Kelola FAQ',
    konten: 'Kelola Konten',
    pengaturan: 'Pengaturan'
};

$('[data-toggle-password]').on('click', function () {
    const input = $('#' + $(this).data('toggle-password'));
    if (input.attr('type') === 'password') {
        input.attr('type', 'text');
    } else {
        input.attr('type', 'password');
    }
    $(this).find('i').toggleClass('fa-eye fa-eye-slash');
});

function setFieldError(input, message) {
    $('#' + input.attr('id') + '-error').text(message);
    input.toggleClass('is-invalid', message !== '');
}

function shakeCard() {
    $('.login-card').addClass('is-shaking');
    setTimeout(function () {
        $('.login-card').removeClass('is-shaking');
    }, 450);
}

function showLoginAlert(message, type) {
    $('#login-alert').attr('class', 'form-alert form-alert--' + type).text(message).prop('hidden', false);
}

if ($('#login-form').length > 0) {
    if (sessionStorage.getItem('surobites_login') === 'true') {
        window.location.href = 'admin-dashboard.html';
    }

    if (sessionStorage.getItem('surobites_pesan')) {
        showLoginAlert(sessionStorage.getItem('surobites_pesan'), 'info');
        sessionStorage.removeItem('surobites_pesan');
    }

    $('#login-username, #login-password').on('input', function () {
        setFieldError($(this), '');
    });

    $('#login-form').on('submit', function (e) {
        e.preventDefault();

        const username = $('#login-username');
        const password = $('#login-password');
        let valid = true;

        $('#login-alert').prop('hidden', true);

        if (username.val().trim() === '') {
            setFieldError(username, 'Username wajib diisi.');
            valid = false;
        } else {
            setFieldError(username, '');
        }

        if (password.val() === '') {
            setFieldError(password, 'Password wajib diisi.');
            valid = false;
        } else {
            setFieldError(password, '');
        }

        if (!valid) {
            shakeCard();
            return;
        }

        $('#login-submit').prop('disabled', true).html('<span class="btn-spinner"></span><span>Memeriksa akun...</span>');

        setTimeout(function () {
            if (username.val().trim() === admin.username && password.val() === admin.password) {
                sessionStorage.setItem('surobites_login', 'true');
                sessionStorage.setItem('surobites_welcome', 'true');
                localStorage.setItem('surobites_last_login', Date.now());
                $('#login-submit').html('<span class="btn-spinner"></span><span>Berhasil, mengalihkan...</span>');
                showToast('Login berhasil');
                setTimeout(function () {
                    window.location.href = 'admin-dashboard.html';
                }, 900);
            } else {
                $('#login-submit').prop('disabled', false).html('<span>Login</span>');
                showLoginAlert('Username atau password salah. Silakan coba lagi.', 'error');
                password.val('').focus();
                shakeCard();
            }
        }, 600);
    });
}

function showSection(name) {
    if (!sectionTitles[name]) {
        name = 'dashboard';
    }

    $('[data-section]').prop('hidden', true);
    $(`[data-section="${name}"]`).prop('hidden', false);
    $('[data-section-link]').removeClass('is-active');
    $(`[data-section-link="${name}"]`).addClass('is-active');
    $('[data-page-title]').text(sectionTitles[name]);
    document.title = sectionTitles[name] + ' | Admin SuroBites';

    closeSidebar();
    $(window).scrollTop(0);

    if (name === 'dashboard') {
        growBars();
    }
}

function openSidebar() {
    $('#admin-sidebar').addClass('is-open');
    $('.sidebar-backdrop').addClass('is-visible');
    $('body').addClass('sidebar-open');
}

function closeSidebar() {
    $('#admin-sidebar').removeClass('is-open');
    $('.sidebar-backdrop').removeClass('is-visible');
    $('body').removeClass('sidebar-open');
}

function growBars() {
    setTimeout(function () {
        $('.bar-fill').each(function () {
            $(this).css('width', $(this).data('width'));
        });
    }, 100);
}

function renderDashboard() {
    const favoriteFoods = foods.filter(function (food) {
        return getFavorites().includes(food.id);
    });

    const stats = [
        { label: 'Jumlah makanan', value: foods.length, icon: '🍲', color: '', hint: 'Tampil di Katalog & Rekomendasi', link: '#makanan' },
        { label: 'Jumlah warung', value: warungs.length, icon: '📍', color: 'orange', hint: 'Tampil di Lokasi Warung', link: '#warung' },
        { label: 'Jumlah FAQ', value: faqs.length, icon: '💬', color: '', hint: 'Tampil di Beranda', link: '#faq' },
        { label: 'Makanan difavoritkan', value: favoriteFoods.length, icon: '♥', color: 'red', hint: 'Disimpan pengunjung di browser ini', link: 'favorit.html' }
    ];

    let statHtml = '';
    $.each(stats, function (index, stat) {
        statHtml += `
            <a class="stat-card" href="${stat.link}">
                <span class="stat-card__top">
                    <span class="stat-card__label">${stat.label}</span>
                    <span class="stat-card__icon stat-card__icon--${stat.color}">${stat.icon}</span>
                </span>
                <strong class="stat-card__value">${stat.value}</strong>
                <span class="stat-card__hint">${stat.hint}</span>
            </a>`;
    });
    $('[data-stats]').html(statHtml);

    let chartHtml = '<ul class="bar-list">';
    $.each(categories, function (index, category) {
        const total = foods.filter(function (food) {
            return food.categories.includes(category.id);
        }).length;
        const percent = Math.round(total / foods.length * 100);
        chartHtml += `
            <li class="bar-row" data-tooltip="${total} dari ${foods.length} makanan (${percent}%)">
                <span class="bar-row__label">${category.icon} ${category.label}</span>
                <span class="bar-track"><span class="bar-fill" data-width="${percent}%"></span></span>
                <span class="bar-row__value">${total}</span>
            </li>`;
    });
    chartHtml += '</ul>';
    $('[data-category-chart]').html(chartHtml);

    const lastLogin = localStorage.getItem('surobites_last_login');
    if (lastLogin) {
        $('[data-activity]').html(`
            <li>
                <span class="activity-dot activity-dot--login">🔑</span>
                <div>
                    <p>Login ke dashboard admin</p>
                    <time>${new Date(parseInt(lastLogin)).toLocaleString('id-ID')}</time>
                </div>
            </li>`);
    } else {
        $('[data-activity]').html('<li class="panel-empty">Belum ada aktivitas.</li>');
    }

    let favoriteHtml = '<p class="panel-empty">Belum ada makanan yang difavoritkan di browser ini.</p>';
    if (favoriteFoods.length > 0) {
        favoriteHtml = '<div class="mini-food-grid">';
        $.each(favoriteFoods, function (index, food) {
            favoriteHtml += `<div class="mini-food"><img src="${food.image}" alt="${food.name}"><span>${food.name}</span></div>`;
        });
        favoriteHtml += '</div>';
    }
    $('[data-fav-foods]').html(favoriteHtml);
}

function renderFoodTable() {
    const keyword = $('[data-filter="food"]').val().toLowerCase().trim();
    const list = foods.filter(function (food) {
        return food.name.toLowerCase().includes(keyword);
    });

    $('[data-count="food"]').text(list.length + ' makanan');

    let html = '';
    $.each(list, function (index, food) {
        let tags = '';
        $.each(food.categories, function (i, id) {
            const category = getCategory(id);
            tags += `<span class="tag">${category.icon} ${category.label}</span>`;
        });

        const timeList = [];
        $.each(food.timeCategory, function (i, id) {
            timeList.push(getTime(id).label);
        });

        let featured = '';
        if (food.featured) {
            featured = '<span class="featured-flag">★ Pilihan Beranda</span>';
        }

        html += `
            <tr>
                <td class="cell-main" data-label="Makanan">
                    <div class="cell-food">
                        <img src="${food.image}" alt="">
                        <div>
                            <strong>${food.name}</strong>
                            ${featured}
                            <small>${food.shortDescription}</small>
                        </div>
                    </div>
                </td>
                <td data-label="Kategori"><div class="tag-list">${tags}</div></td>
                <td data-label="Harga">
                    <div><span class="tag tag--orange">${getPrice(food.priceCategory).label}</span>
                    <small class="cell-sub">${food.priceRange}</small></div>
                </td>
                <td data-label="Waktu">${timeList.join(', ')}</td>
                <td data-label="Aksi" class="text-right">
                    <div class="row-actions">
                        <button type="button" class="icon-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="icon-btn icon-btn--danger" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>`;
    });

    if (list.length === 0) {
        html = '<tr><td colspan="5" class="table-empty">Makanan tidak ditemukan.</td></tr>';
    }
    $('[data-table="food"]').html(html);
}

function renderReco() {
    let summary = '';
    $.each(categories, function (index, category) {
        const total = foods.filter(function (food) {
            return food.categories.includes(category.id);
        }).length;
        summary += `
            <div class="summary-chip">
                <span class="summary-chip__icon">${category.icon}</span>
                <div><strong>${total}</strong><small>${category.label}</small></div>
            </div>`;
    });
    $('[data-category-summary]').html(summary);

    let html = '';
    $.each(foods, function (index, food) {
        let chips = '';
        $.each(categories, function (i, category) {
            let checked = '';
            if (food.categories.includes(category.id)) {
                checked = ' checked';
            }
            chips += `<label class="check-chip"><input type="checkbox"${checked}><span>${category.icon} ${category.label}</span></label>`;
        });

        let featured = '';
        if (food.featured) {
            featured = ' checked';
        }

        html += `
            <div class="reco-row">
                <div class="reco-row__food">
                    <img src="${food.image}" alt="">
                    <div>
                        <strong>${food.name}</strong>
                        <small>${food.categories.length} kategori</small>
                    </div>
                </div>
                <div class="check-group">
                    ${chips}
                    <label class="check-chip check-chip--star"><input type="checkbox"${featured}><span>★ Pilihan</span></label>
                </div>
            </div>`;
    });
    $('[data-reco-list]').html(html);
}

function renderWarungTable() {
    const keyword = $('[data-filter="warung"]').val().toLowerCase().trim();
    const list = warungs.filter(function (warung) {
        return warung.name.toLowerCase().includes(keyword);
    });

    $('[data-count="warung"]').text(list.length + ' warung');

    let html = '';
    $.each(list, function (index, warung) {
        let menu = '';
        $.each(warung.foodIds, function (i, foodId) {
            menu += `<span class="tag tag--gray">${findFood(foodId).name}</span>`;
        });
        $.each(warung.otherMenu, function (i, item) {
            menu += `<span class="tag tag--gray">${item}</span>`;
        });

        let status = '<span class="tag tag--gray">● Tutup</span>';
        if (isWarungOpen(warung)) {
            status = '<span class="tag tag--green">● Buka</span>';
        }

        html += `
            <tr>
                <td class="cell-main" data-label="Warung">
                    <div class="cell-food">
                        <img src="${warung.image}" alt="">
                        <div>
                            <strong>${warung.name}</strong>
                            <small>${warung.address}</small>
                        </div>
                    </div>
                </td>
                <td data-label="Jam Buka">
                    <div class="cell-time"><strong>${formatTime(warung.openTime)} – ${formatTime(warung.closeTime)}</strong>
                    <small class="cell-sub">${warung.openDays}</small></div>
                </td>
                <td data-label="Menu"><div class="tag-list">${menu}</div></td>
                <td data-label="Status">${status}</td>
                <td data-label="Aksi" class="text-right">
                    <div class="row-actions">
                        <button type="button" class="icon-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="icon-btn icon-btn--danger" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>`;
    });

    if (list.length === 0) {
        html = '<tr><td colspan="5" class="table-empty">Warung tidak ditemukan.</td></tr>';
    }
    $('[data-table="warung"]').html(html);
}

function renderFaqAdmin() {
    let html = '';
    $.each(faqs, function (index, faq) {
        html += `
            <div class="faq-admin-item">
                <span class="faq-admin-item__num">${index + 1}</span>
                <div>
                    <h3>${faq.question}</h3>
                    <p>${faq.answer}</p>
                </div>
                <div class="row-actions">
                    <button type="button" class="icon-btn" title="Naikkan"><i class="fa-solid fa-chevron-up"></i></button>
                    <button type="button" class="icon-btn" title="Turunkan"><i class="fa-solid fa-chevron-down"></i></button>
                    <button type="button" class="icon-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="icon-btn icon-btn--danger" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`;
    });
    $('[data-faq-admin]').html(html);
}

if ($('.admin-layout').length > 0) {
    $('[data-today]').text(new Date().toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }));
    $('[data-nav-count="makanan"]').text(foods.length);
    $('[data-nav-count="warung"]').text(warungs.length);
    $('[data-nav-count="faq"]').text(faqs.length);

    renderDashboard();
    renderFoodTable();
    renderReco();
    renderWarungTable();
    renderFaqAdmin();
    showSection(window.location.hash.replace('#', ''));

    if (sessionStorage.getItem('surobites_welcome')) {
        showToast('Selamat datang di Dashboard SuroBites!');
        sessionStorage.removeItem('surobites_welcome');
    }

    $(window).on('hashchange', function () {
        showSection(window.location.hash.replace('#', ''));
    });

    $('.admin-menu-btn').on('click', openSidebar);
    $('[data-sidebar-close]').on('click', closeSidebar);

    $('[data-filter="food"]').on('input', renderFoodTable);
    $('[data-filter="warung"]').on('input', renderWarungTable);

    $('#content-form').on('input', function () {
        $('[data-preview-text]').each(function () {
            $(this).text($(`[name="${$(this).data('preview-text')}"]`).val());
        });
    });

    $('[data-action="logout"]').on('click', function () {
        showConfirm({
            title: 'Keluar dari dashboard?',
            message: 'Kamu perlu login kembali untuk mengelola konten SuroBites.',
            button: 'Ya, Logout',
            icon: '👋'
        }, function () {
            sessionStorage.removeItem('surobites_login');
            sessionStorage.setItem('surobites_pesan', 'Kamu berhasil logout. Sampai jumpa lagi!');
            window.location.href = 'admin-login.html';
        });
    });
}
