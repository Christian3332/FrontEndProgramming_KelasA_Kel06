$(document).ready(function() {
    //Untuk toogle bar navigasi
    $('#mobile-menu').on('click', function() {
        $('.navbar').toggleClass('active');
        $(this).attr('aria-expanded', $('.navbar').hasClass('active'));
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

$('body').append('<div class="modal-overlay modal--food" id="food-modal"><div class="modal-dialog"></div></div>');
$('body').append('<div class="modal-overlay modal--map" id="map-modal"><div class="modal-dialog"></div></div>');


const params = new URLSearchParams(window.location.search);
let searchKeyword = params.get('q') || '';
let activeCategory = params.get('kategori');
let katalogLimit = 9;
let rekomendasiLimit = 9;

if (!getCategory(activeCategory)) {
    activeCategory = null;
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function heartButton(food) {
    let activeClass = '';
    let iconClass = 'fa-regular fa-heart';
    if (isFavorite(food.id)) {
        activeClass = ' is-active';
        iconClass = 'fa-solid fa-heart';
    }
    return `<button type="button" class="fav-btn${activeClass}" data-fav-toggle="${food.id}" aria-label="Favorit ${food.name}"><i class="${iconClass}"></i></button>`;
}

function foodCard(food, delay, showTags) {
    let cardClass = 'card';
    let cardStyle = '';
    if (delay >= 0) {
        cardClass = 'card card-animate';
        cardStyle = '--i:' + delay;
    }

    let tags = '';
    if (showTags) {
        tags = '<div class="card-tags">';
        $.each(food.categories.slice(0, 2), function (index, id) {
            const category = getCategory(id);
            tags += `<span class="card-tag">${category.icon} ${category.label}</span>`;
        });
        tags += '</div>';
    }

    return `
        <article class="${cardClass}" style="${cardStyle}" data-food-id="${food.id}">
            <div class="card-img-wrapper">
                <img src="${food.image}" alt="${food.name}" class="card-img" loading="lazy">
                ${heartButton(food)}
                ${tags}
            </div>
            <div class="card-footer">
                <h3 class="card-title">${food.name}</h3>
                <button type="button" class="btn-primary" data-open-food="${food.id}">Deskripsi Singkat</button>
            </div>
        </article>`;
}

function highlightCard(food, delay) {
    return `
        <article class="card card-animate" data-food-id="${food.id}" style="--i:${delay}">
            <div class="card-img-wrapper">
                <img src="${food.image}" alt="${food.name}" class="card-img" loading="lazy">
                ${heartButton(food)}
            </div>
            <div class="card-body">
                <h3>${food.name}</h3>
                <button type="button" class="btn-outline" data-open-food="${food.id}">Deskripsi Singkat</button>
            </div>
        </article>`;
}

function emptyState(icon, title, text, button) {
    return `
        <div class="empty-state">
            <div class="empty-state__icon">${icon}</div>
            <h3>${title}</h3>
            <p>${text}</p>
            ${button}
        </div>`;
}

function categoryNames(food) {
    const names = [];
    $.each(food.categories, function (index, id) {
        names.push(getCategory(id).label);
    });
    return names;
}

function searchFoods(keyword) {
    keyword = keyword.toLowerCase().trim();

    const results = foods.filter(function (food) {
        const text = food.name + ' ' + food.shortDescription + ' ' + food.taste + ' ' +
            food.ingredients.join(' ') + ' ' + categoryNames(food).join(' ');
        return text.toLowerCase().includes(keyword);
    });

    results.sort(function (a, b) {
        const aName = a.name.toLowerCase().includes(keyword) ? 0 : 1;
        const bName = b.name.toLowerCase().includes(keyword) ? 0 : 1;
        return aName - bName;
    });
    return results;
}

function updateLoadMore(name, total, shown) {
    const box = $(`[data-load-more="${name}"]`);
    box.prop('hidden', shown >= total);
    box.find('[data-load-more-label]').text(`Tampilkan Lebih Banyak (${total - shown} lagi)`);
}

function renderHome() {
    let html = '';
    $.each(foods.slice(0, 6), function (index, food) {
        html += foodCard(food, index, false);
    });
    $('[data-food-list="home"]').html(html);
    $('[data-katalog-more]').prop('hidden', foods.length <= 6);
}

function renderFeatured() {
    let list = foods.filter(function (food) {
        return food.featured;
    });
    let html = '';
    $.each(list.slice(0, 3), function (index, food) {
        html += highlightCard(food, index);
    });
    $('[data-food-list="featured"]').html(html);
}

function renderKatalog(oldLimit) {
    if ($('[data-food-list="katalog"]').length === 0) {
        return;
    }

    let list = foods;
    if (searchKeyword) {
        list = searchFoods(searchKeyword);
        $('[data-search-status]').prop('hidden', false).html(`
            <span>Menampilkan <strong>${list.length}</strong> hasil untuk <strong>"${$('<div>').text(searchKeyword).html()}"</strong></span>
            <a href="katalog.html" class="link-btn">✕ Hapus pencarian</a>`);
    }

    if (list.length === 0) {
        $('[data-food-list="katalog"]').html(emptyState('🔍', 'Kuliner yang kamu cari belum ditemukan.',
            'Coba kata kunci lain, misalnya nama makanan, bahan, atau kategori seperti "pedas".',
            '<a href="katalog.html" class="ui-btn ui-btn--primary">Lihat Semua Kuliner</a>'));
        updateLoadMore('katalog', 0, 0);
        return;
    }

    let shown = list;
    if (!searchKeyword) {
        shown = list.slice(0, katalogLimit);
    }

    let html = '';
    $.each(shown, function (index, food) {
        html += foodCard(food, index - oldLimit, false);
    });
    $('[data-food-list="katalog"]').html(html);
    updateLoadMore('katalog', list.length, shown.length);
}

function categoryCardContent(category) {
    const total = foods.filter(function (food) {
        return food.categories.includes(category.id);
    }).length;

    return `
        <span class="kategori-card__icon">${category.icon}</span>
        <span class="kategori-card__label">${category.label}</span>
        <span class="kategori-card__desc">${category.description}</span>
        <span class="kategori-card__count">${total} kuliner</span>`;
}

function renderCategoryLinks() {
    let html = '';
    $.each(categories, function (index, category) {
        html += `<a class="kategori-card" href="rekomendasi.html?kategori=${category.id}">${categoryCardContent(category)}</a>`;
    });
    $('[data-category-links]').html(html);
}

function renderCategoryButtons() {
    let html = '';
    $.each(categories, function (index, category) {
        let activeClass = '';
        if (category.id === activeCategory) {
            activeClass = ' is-active';
        }
        html += `<button type="button" class="kategori-card${activeClass}" data-category="${category.id}">${categoryCardContent(category)}</button>`;
    });
    $('[data-category-filter]').html(html);
}

function renderRekomendasi(oldLimit) {
    if ($('[data-food-list="rekomendasi"]').length === 0) {
        return;
    }

    let list = foods;
    const category = getCategory(activeCategory);

    if (category) {
        list = foods.filter(function (food) {
            return food.categories.includes(category.id);
        });
        $('[data-results-title]').text(category.icon + ' Rekomendasi ' + category.label);
        $('[data-results-subtitle]').text(list.length + ' kuliner cocok untuk kamu yang sedang ingin ' + category.label.toLowerCase() + '.');
        $('.results-toolbar [data-category-reset]').prop('hidden', false);
    } else {
        $('[data-results-title]').text('Semua Kuliner Surabaya');
        $('[data-results-subtitle]').text(list.length + ' kuliner khas Surabaya siap kamu jelajahi. Pilih kategori di atas untuk menyaring.');
        $('.results-toolbar [data-category-reset]').prop('hidden', true);
    }

    const shown = list.slice(0, rekomendasiLimit);
    let html = '';
    $.each(shown, function (index, food) {
        html += foodCard(food, index - oldLimit, true);
    });
    $('[data-food-list="rekomendasi"]').html(html);
    updateLoadMore('rekomendasi', list.length, shown.length);
}

function chooseCategory(id) {
    activeCategory = id;
    rekomendasiLimit = 9;
    renderCategoryButtons();
    renderRekomendasi(0);

    if ($(window).width() < 992) {
        $('html, body').animate({
            scrollTop: $('#hasil-rekomendasi').offset().top - 80
        }, 500);
    }
}

function getFavoriteFoods() {
    const favorites = getFavorites();
    return foods.filter(function (food) {
        return favorites.includes(food.id);
    });
}

function renderFavorit() {
    if ($('[data-food-list="favorit"]').length === 0) {
        return;
    }

    const list = getFavoriteFoods();
    $('[data-fav-clear]').prop('hidden', list.length === 0);

    if (list.length === 0) {
        $('[data-fav-summary]').text('Simpan kuliner yang ingin kamu coba agar mudah ditemukan kembali.');
        $('[data-food-list="favorit"]').html(emptyState('♡', 'Belum ada makanan favorit.',
            'Klik ikon hati pada makanan yang ingin kamu simpan.',
            '<a href="katalog.html" class="ui-btn ui-btn--primary">Jelajahi Katalog</a>'));
        return;
    }

    $('[data-fav-summary]').text('Kamu menyimpan ' + list.length + ' kuliner favorit. Klik ikon hati lagi untuk menghapusnya dari daftar.');
    let html = '';
    $.each(list, function (index, food) {
        html += foodCard(food, index, false);
    });
    $('[data-food-list="favorit"]').html(html);
}

function updateFavoriteCount() {
    const total = getFavoriteFoods().length;
    $('[data-fav-count]').text(total).prop('hidden', total === 0);
    $('.header-fav').toggleClass('has-items', total > 0);
    $('.header-fav i').attr('class', total > 0 ? 'fa-solid fa-heart' : 'fa-regular fa-heart');
}

function toggleFavorite(id, button) {
    const food = findFood(id);
    let favorites = getFavorites();
    let active = false;

    if (favorites.includes(id)) {
        favorites = favorites.filter(function (favoriteId) {
            return favoriteId !== id;
        });
    } else {
        favorites.push(id);
        active = true;
    }
    saveFavorites(favorites);

    $(`[data-fav-toggle="${id}"]`).toggleClass('is-active', active);
    $(`[data-fav-toggle="${id}"] i`).attr('class', active ? 'fa-solid fa-heart' : 'fa-regular fa-heart');
    $(`[data-fav-toggle="${id}"] [data-fav-text]`).text(active ? 'Tersimpan di Favorit' : 'Simpan ke Favorit');

    $(button).addClass('is-popping');
    setTimeout(function () {
        $(button).removeClass('is-popping');
    }, 500);

    updateFavoriteCount();
    $('[data-fav-count]').addClass('is-bump');
    setTimeout(function () {
        $('[data-fav-count]').removeClass('is-bump');
    }, 450);

    if (active) {
        showToast(food.name + ' ditambahkan ke favorit', 'favorite');
    } else {
        showToast(food.name + ' dihapus dari favorit', 'remove');
    }

    if ($('[data-food-list="favorit"]').length > 0) {
        const card = $(`[data-food-list="favorit"] [data-food-id="${id}"]`);
        if (card.length > 0 && !active) {
            card.addClass('is-removing');
            setTimeout(renderFavorit, 300);
        } else {
            renderFavorit();
        }
    }
}

function ingredientList(food) {
    let html = '<ul class="ingredient-list">';
    $.each(food.ingredients, function (index, item) {
        html += `<li>${item}</li>`;
    });
    return html + '</ul>';
}

function timeText(food) {
    const list = [];
    $.each(food.timeCategory, function (index, id) {
        const time = getTime(id);
        list.push(time.icon + ' ' + time.label);
    });
    return list.join(', ');
}

function warungLinks(list) {
    let html = '<ul class="warung-links">';
    $.each(list, function (index, warung) {
        html += `<li><a href="lokasi.html#${warung.id}"><i class="fa-solid fa-location-dot"></i>${warung.name}</a></li>`;
    });
    return html + '</ul>';
}

function mobileDetail(food, warungList) {
    let html = `
        <div class="info-grid">
            <div class="info-card info-card--full"><h3>Bahan Utama</h3>${ingredientList(food)}</div>
            <div class="info-card"><h3>Karakteristik</h3><p>${food.taste}</p></div>
            <div class="info-card"><h3>Waktu Terbaik</h3><p>${timeText(food)}</p></div>
        </div>
        <div class="story-box"><h3>📜 Kisah Rasa</h3><p>${food.story}</p></div>`;

    if (warungList.length > 0) {
        html += `<div><h3 class="food-modal__section-title">Tersedia di</h3>${warungLinks(warungList)}</div>`;
    }
    return html;
}

function detailItem(id, icon, title, content, open) {
    let openClass = '';
    if (open) {
        openClass = ' is-open';
    }
    return `
        <div class="detail-item${openClass}">
            <h3 class="detail-heading">
                <button type="button" class="detail-toggle" id="detail-${id}">
                    <span class="detail-toggle__label">
                        <span class="detail-toggle__icon">${icon}</span>${title}
                    </span>
                    <span class="faq-icon"></span>
                </button>
            </h3>
            <div class="detail-panel">
                <div class="detail-panel__inner"><div class="detail-panel__content">${content}</div></div>
            </div>
        </div>`;
}

function desktopDetail(food, warungList) {
    const facts = `
        <div class="detail-facts">
            <div class="info-card"><h4>Karakteristik</h4><p>${food.taste}</p></div>
            <div class="info-card"><h4>Waktu Terbaik</h4><p>${timeText(food)}</p></div>
        </div>`;

    let html = '<div class="detail-list">';
    html += detailItem('bahan', '🧾', 'Bahan Utama', ingredientList(food), true);
    html += detailItem('rasa', '😋', 'Karakteristik & Waktu Terbaik', facts, false);
    html += detailItem('kisah', '📜', 'Kisah Rasa', `<p class="detail-text">${food.story}</p>`, false);
    if (warungList.length > 0) {
        html += detailItem('warung', '📍', 'Tersedia di', warungLinks(warungList), false);
    }
    return html + '</div>';
}

function openFoodModal(id) {
    const food = findFood(id);
    const favorite = isFavorite(food.id);
    const price = getPrice(food.priceCategory);
    const warungList = warungs.filter(function (warung) {
        return warung.foodIds.includes(food.id);
    });

    let chips = '<div class="chip-list">';
    $.each(food.categories, function (index, categoryId) {
        const category = getCategory(categoryId);
        chips += `<a class="chip" href="rekomendasi.html?kategori=${category.id}">${category.icon} ${category.label}</a>`;
    });
    chips += '</div>';

    let detail = mobileDetail(food, warungList);
    if ($(window).width() >= 768) {
        detail = desktopDetail(food, warungList);
    }

    $('#food-modal .modal-dialog').html(`
        <button type="button" class="modal-close" data-modal-close aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
        <div class="food-modal__media">
            <img src="${food.image}" alt="${food.name}">
            <span class="food-modal__price">💰 ${price.label} · ${food.priceRange}</span>
        </div>
        <div class="food-modal__body">
            <div class="food-modal__intro">
                <p class="food-modal__eyebrow">Deskripsi Singkat</p>
                <h2 class="food-modal__title">${food.name}</h2>
                ${chips}
                <p class="food-modal__desc">${food.shortDescription}</p>
            </div>
            ${detail}
            <div class="food-modal__actions">
                <button type="button" class="btn-fav${favorite ? ' is-active' : ''}" data-fav-toggle="${food.id}">
                    <i class="${favorite ? 'fa-solid' : 'fa-regular'} fa-heart"></i><span data-fav-text>${favorite ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}</span>
                </button>
                <a href="rekomendasi.html?kategori=${food.categories[0]}" class="btn-outline">Lihat yang Serupa</a>
            </div>
        </div>`);

    openModal('#food-modal');
}

function warungCard(warung, index) {
    let menu = '';
    $.each(warung.foodIds, function (i, foodId) {
        const food = findFood(foodId);
        menu += `<button type="button" class="menu-chip" data-open-food="${food.id}">${food.name}</button>`;
    });
    $.each(warung.otherMenu, function (i, item) {
        menu += `<span class="menu-chip">${item}</span>`;
    });

    let status = '<span class="status-badge is-closed">Sedang tutup</span>';
    if (isWarungOpen(warung)) {
        status = '<span class="status-badge is-open">Buka sekarang</span>';
    }

    return `
        <article class="card warung-card card-animate" id="${warung.id}" style="--i:${index}">
            <div class="warung-card__media">
                <img src="${warung.image}" alt="${warung.name}" loading="lazy">
                ${status}
            </div>
            <div class="warung-card__body">
                <h3 class="warung-card__title">${warung.name}</h3>
                <ul class="warung-card__info">
                    <li><i class="fa-solid fa-location-dot"></i><span>${warung.address}</span></li>
                    <li><i class="fa-regular fa-clock"></i><span>${warung.openDays}, ${formatTime(warung.openTime)} – ${formatTime(warung.closeTime)} WIB</span></li>
                </ul>
                <p class="warung-card__desc">${warung.description}</p>
                <div class="warung-card__menu"><span class="menu-label">Menu:</span>${menu}</div>
                <div class="warung-card__actions">
                    <button type="button" class="btn-outline" data-map-open="${warung.id}">Lihat Peta</button>
                    <a href="${warung.mapsUrl}" class="btn-blue" target="_blank">Buka Google Maps</a>
                </div>
            </div>
        </article>`;
}

function renderWarungs() {
    if ($('[data-warung-list]').length === 0) {
        return;
    }

    const keyword = $('#warung-filter').val().toLowerCase().trim();
    const list = warungs.filter(function (warung) {
        const text = warung.name + ' ' + warung.address + ' ' + warung.description + ' ' + warung.otherMenu.join(' ');
        return text.toLowerCase().includes(keyword);
    });

    if (keyword) {
        $('[data-warung-count]').text(list.length + ' dari ' + warungs.length + ' warung cocok dengan pencarianmu');
    } else {
        $('[data-warung-count]').text(warungs.length + ' warung kuliner pilihan di Surabaya');
    }

    if (list.length === 0) {
        $('[data-warung-list]').html(emptyState('📍', 'Warung belum ditemukan', 'Coba cari dengan nama warung, alamat, atau menu lain.', ''));
        return;
    }

    let html = '';
    $.each(list, function (index, warung) {
        html += warungCard(warung, index);
    });
    $('[data-warung-list]').html(html);
}

function highlightWarung() {
    const card = $(window.location.hash + '.warung-card');
    if (window.location.hash === '' || card.length === 0) {
        return;
    }
    $('html, body').animate({
        scrollTop: card.offset().top - 100
    }, 500);
    card.addClass('is-highlighted');
    setTimeout(function () {
        card.removeClass('is-highlighted');
    }, 3000);
}

function openMapModal(id) {
    const warung = findWarung(id);
    $('#map-modal .modal-dialog').html(`
        <button type="button" class="modal-close" data-modal-close aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
        <div class="map-frame">
            <iframe src="${getMapsEmbed(warung)}" title="Peta ${warung.name}" loading="lazy" allowfullscreen></iframe>
        </div>
        <div class="map-modal__body">
            <h2>${warung.name}</h2>
            <p>${warung.address}</p>
            <a href="${warung.mapsUrl}" target="_blank" class="ui-btn ui-btn--blue">Buka di Google Maps ↗</a>
        </div>`);
    openModal('#map-modal');
}

function renderWarungCarousel() {
    let html = '';
    $.each(warungs, function (index, warung) {
        let activeClass = '';
        if (index === 0) {
            activeClass = ' is-active';
        }
        html += `
            <div class="carousel-slide${activeClass}">
                <img src="${warung.image}" alt="${warung.name}" loading="lazy">
                <div class="warung-info">
                    <h3>${warung.name}</h3>
                    <p>${warung.address}</p>
                    <a href="${warung.mapsUrl}" class="btn-blue" target="_blank">Kunjungi</a>
                </div>
            </div>`;
    });
    $('[data-warung-carousel]').html(html);
}

function renderFaq() {
    let html = '';
    $.each(faqs, function (index, faq) {
        html += `
            <div class="faq-item">
                <h3 class="faq-heading">
                    <button type="button" class="faq-question">
                        <span>${faq.question}</span>
                        <span class="faq-icon"></span>
                    </button>
                </h3>
                <div class="faq-answer">
                    <div class="faq-answer__inner"><p>${faq.answer}</p></div>
                </div>
            </div>`;
    });
    $('[data-faq-list]').html(html);
}

function showSearchResults() {
    const keyword = $('#search-input').val().trim();
    if (keyword === '') {
        $('.search-results').prop('hidden', true);
        return;
    }

    const results = searchFoods(keyword);
    let html = '';

    if (results.length === 0) {
        html = '<div class="search-empty"><strong>Kuliner yang kamu cari belum ditemukan.</strong>Coba kata kunci lain, misalnya "rawon", "pedas", atau "petis".</div>';
    } else {
        html = `<p class="search-results__label">${results.length} kuliner ditemukan</p>`;
        $.each(results.slice(0, 5), function (index, food) {
            let name = food.name;
            const position = food.name.toLowerCase().indexOf(keyword.toLowerCase());
            if (position >= 0) {
                name = food.name.slice(0, position) + '<mark>' + food.name.slice(position, position + keyword.length) + '</mark>' + food.name.slice(position + keyword.length);
            }
            html += `
                <button type="button" class="search-result" data-open-food="${food.id}">
                    <img src="${food.image}" alt="">
                    <span class="search-result__text">
                        <span class="search-result__name">${name}</span>
                        <span class="search-result__meta">${categoryNames(food).join(' · ')}</span>
                    </span>
                </button>`;
        });
        html += `<a class="search-results__footer" href="katalog.html?q=${encodeURIComponent(keyword)}">Lihat semua hasil di Katalog →</a>`;
    }

    $('.search-results').html(html).prop('hidden', false);
}

$('.search-bar').append('<div class="search-results" hidden></div>');
$('#search-input').val(searchKeyword).attr('autocomplete', 'off');
$('#search-input').on('input', showSearchResults);

$('.search-bar').on('submit', function(e) {
    e.preventDefault();

    let keyword = $(this).find('input[type="text"]').val().toLowerCase().trim();
    if (keyword === "") return;

    let isFound = searchFoods(keyword).length > 0;
    //logika pencarian
    if (isFound) {
        window.location.href = 'katalog.html?q=' + encodeURIComponent(keyword);
    } else {
        $('#popup-message').html('Kuliner yang kamu cari belum ditemukan. Maaf, <strong>"' + $('<div>').text(keyword).html() + '"</strong> belum ada di katalog kami saat ini.');
        $('#custom-popup').css('display', 'flex').hide().fadeIn('fast');
        $('.search-results').prop('hidden', true);

        // Mengosongkan input pencarian
        $(this).find('input[type="text"]').val('');
    }
});

$(document).on('click', function (e) {
    if ($(e.target).closest('.search-bar').length === 0 || $(e.target).closest('.search-result').length > 0) {
        $('.search-results').prop('hidden', true);
    }
});

$(document).on('click', '[data-fav-toggle]', function () {
    toggleFavorite($(this).data('fav-toggle'), this);
});

$(document).on('click', '[data-open-food]', function () {
    openFoodModal($(this).data('open-food'));
});

$(document).on('click', '.detail-toggle', function () {
    const item = $(this).closest('.detail-item');
    const wasOpen = item.hasClass('is-open');
    $(this).closest('.detail-list').find('.detail-item').removeClass('is-open');
    if (!wasOpen) {
        item.addClass('is-open');
    }
});

$(document).on('click', '#food-modal a', function () {
    closeModal('#food-modal');
});

$(document).on('click', '[data-map-open]', function () {
    openMapModal($(this).data('map-open'));
});

$(document).on('click', '.faq-question', function () {
    $(this).closest('.faq-item').toggleClass('is-open');
});

$(document).on('click', '[data-category]', function () {
    if (activeCategory === $(this).data('category')) {
        chooseCategory(null);
    } else {
        chooseCategory($(this).data('category'));
    }
});

$(document).on('click', '[data-category-reset]', function () {
    chooseCategory(null);
});

$(document).on('click', '[data-load-more-btn]', function () {
    if ($(this).data('load-more-btn') === 'katalog') {
        katalogLimit += 9;
        renderKatalog(katalogLimit - 9);
    } else {
        rekomendasiLimit += 9;
        renderRekomendasi(rekomendasiLimit - 9);
    }
});

$(document).on('click', '[data-fav-clear]', function () {
    showConfirm({
        title: 'Hapus semua favorit?',
        message: 'Semua makanan yang sudah kamu simpan akan dihapus dari daftar favorit.',
        button: 'Ya, Hapus Semua',
        icon: '💔'
    }, function () {
        saveFavorites([]);
        renderFavorit();
        updateFavoriteCount();
        showToast('Semua favorit berhasil dihapus', 'remove');
    });
});

$('#warung-filter').on('input', renderWarungs);
$(window).on('hashchange', highlightWarung);

$('[data-stat="foods"]').text(foods.length);
$('[data-stat="categories"]').text(categories.length);
$('[data-stat="warungs"]').text(warungs.length);

renderCategoryLinks();
renderFeatured();
renderHome();
renderKatalog(0);
renderCategoryButtons();
renderRekomendasi(0);
renderFavorit();
renderWarungCarousel();
renderWarungs();
renderFaq();
updateFavoriteCount();
setTimeout(highlightWarung, 300);

// Carousel warung berganti dengan efek fade, tombol, atau otomatis.
let slideIndex = 0;
let slideTimer = null;

function showSlide(index) {
    const slides = $('.carousel-slide');
    slideIndex = (index + slides.length) % slides.length;
    slides.removeClass('is-active');
    slides.eq(slideIndex).addClass('is-active');
}

function startSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(function () {
        showSlide(slideIndex + 1);
    }, 4000);
}

$('.next-btn').on('click', function () {
    showSlide(slideIndex + 1);
    startSlide();
});

$('.prev-btn').on('click', function () {
    showSlide(slideIndex - 1);
    startSlide();
});

$('.carousel-container').on('mouseenter', function () {
    clearInterval(slideTimer);
});

$('.carousel-container').on('mouseleave', startSlide);

if ($('.carousel-slide').length > 1) {
    startSlide();
}
