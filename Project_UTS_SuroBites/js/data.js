const categories = [
    { id: 'pedas', label: 'Pedas', icon: '🌶️', description: 'Sensasi pedas yang bikin nagih' },
    { id: 'berkuah', label: 'Berkuah', icon: '🍲', description: 'Kuah hangat penuh rempah' },
    { id: 'gurih', label: 'Gurih', icon: '🥘', description: 'Gurih khas bumbu Jawa Timur' },
    { id: 'segar', label: 'Segar', icon: '🥗', description: 'Sayur, buah, dan bumbu segar' },
    { id: 'hemat', label: 'Hemat', icon: '💰', description: 'Kenyang tanpa bikin kantong bolong' },
    { id: 'malam', label: 'Kuliner Malam', icon: '🌙', description: 'Teman lapar di malam hari' }
];

const prices = [
    { id: 'hemat', label: 'Hemat', hint: 'Di bawah Rp20.000' },
    { id: 'sedang', label: 'Sedang', hint: 'Rp20.000 – Rp35.000' },
    { id: 'premium', label: 'Spesial', hint: 'Di atas Rp35.000' }
];

const times = [
    { id: 'pagi', label: 'Pagi', icon: '🌅' },
    { id: 'siang', label: 'Siang', icon: '☀️' },
    { id: 'sore', label: 'Sore', icon: '🌇' },
    { id: 'malam', label: 'Malam', icon: '🌙' }
];

const foods = [
    {
        id: 'rawon-setan',
        name: 'Rawon Setan',
        image: 'img/Rawon.jpg',
        shortDescription: 'Sup daging sapi berkuah hitam pekat dari kluwek dengan aroma rempah yang kuat. Disajikan bersama nasi hangat, tauge pendek, telur asin, kerupuk, dan sambal.',
        story: 'Penamaan "Setan" bermula dari kebiasaan warung-warung rawon di Surabaya masa lalu yang baru mulai buka pada larut malam hingga dini hari (jam setan). Kuah hitam pekatnya yang berasal dari kluwek menjadi identitas tak tergantikan dari kuliner ini.',
        ingredients: ['Daging sapi', 'Kluwek', 'Bawang merah & putih', 'Serai & daun jeruk', 'Tauge pendek', 'Telur asin'],
        taste: 'Gurih, hangat, dan kaya rempah dengan rasa kluwek yang khas',
        categories: ['berkuah', 'gurih', 'hemat', 'malam'],
        priceCategory: 'hemat',
        priceRange: 'Rp15.000 – Rp25.000',
        timeCategory: ['siang', 'malam'],
        featured: true
    },
    {
        id: 'nasi-pecel',
        name: 'Nasi Pecel',
        image: 'img/Nasi Pecel.jpg',
        shortDescription: 'Nasi putih dengan aneka sayuran rebus seperti kangkung, tauge, dan kacang panjang yang disiram bumbu kacang pedas manis, dilengkapi rempeyek renyah.',
        story: 'Hidangan ini memiliki akar sejarah panjang sejak era Majapahit (tercatat dalam Kakawin Ramayana). Di Surabaya, Nasi Pecel berevolusi dengan karakter bumbu kacang yang lebih pekat, berani, dan pedas, selalu disajikan dengan siraman bumbu yang melimpah dan rempeyek renyah.',
        ingredients: ['Nasi putih', 'Sayuran rebus', 'Bumbu kacang', 'Rempeyek', 'Tempe & tahu goreng'],
        taste: 'Pedas manis, segar, dan renyah',
        categories: ['pedas', 'segar', 'hemat'],
        priceCategory: 'hemat',
        priceRange: 'Rp10.000 – Rp20.000',
        timeCategory: ['pagi', 'siang'],
        featured: false
    },
    {
        id: 'tahu-tek',
        name: 'Tahu Tek',
        image: 'img/tahu tek.jpg',
        shortDescription: 'Potongan tahu goreng, lontong, dan kentang yang digunting langsung di atas piring, lalu disiram bumbu kacang petis serta taburan tauge dan kerupuk.',
        story: 'Nama "Tek" diambil dari bunyi tek... tek... tek... yang nyaring terdengar dari gunting penjual keliling saat memotong tahu goreng, lontong, dan kentang. Keunikannya terletak pada bumbu kacang yang diulek bersama petis udang yang legit.',
        ingredients: ['Tahu goreng', 'Lontong', 'Kentang', 'Tauge', 'Bumbu kacang petis', 'Kerupuk'],
        taste: 'Gurih legit petis dengan level pedas yang bisa diatur',
        categories: ['pedas', 'gurih', 'hemat', 'malam'],
        priceCategory: 'hemat',
        priceRange: 'Rp12.000 – Rp20.000',
        timeCategory: ['siang', 'malam'],
        featured: true
    },
    {
        id: 'rujak-cingur',
        name: 'Rujak Cingur',
        image: 'img/Rujak cingur.jpg',
        shortDescription: 'Perpaduan cingur sapi yang empuk dengan buah segar, sayuran rebus, tahu, dan tempe, lalu diaduk bersama bumbu petis hitam yang gurih dan beraroma tajam.',
        story: 'Sebuah mahakarya orisinal Surabaya. Diciptakan dari kreativitas memadukan cingur (moncong sapi) yang direbus hingga sangat empuk, dengan aneka buah, sayuran, dan irisan tempe/tahu, lalu diikat sempurna oleh bumbu ulek petis hitam yang gurih dan beraroma tajam.',
        ingredients: ['Cingur sapi', 'Buah segar', 'Sayuran rebus', 'Tahu & tempe', 'Bumbu petis hitam', 'Kacang tanah'],
        taste: 'Segar, gurih petis, dan pedas',
        categories: ['segar', 'pedas', 'gurih'],
        priceCategory: 'sedang',
        priceRange: 'Rp20.000 – Rp35.000',
        timeCategory: ['siang'],
        featured: false
    },
    {
        id: 'lontong-kikil',
        name: 'Lontong Kikil',
        image: 'img/Lontong kikil.png',
        shortDescription: 'Kikil sapi yang empuk dan kenyal disajikan dengan lontong dalam kuah kuning berkaldu tebal yang kaya rempah, cocok sebagai sajian penghangat.',
        story: 'Bukti kelihaian masyarakat lokal mengolah bagian kaki sapi (kikil). Direbus berjam-jam hingga teksturnya kenyal dan lembut, kikil ini disajikan dengan kuah kuning berkaldu tebal yang kaya akan rempah seperti serai dan jeruk purut, menjadikannya sajian penghangat yang ikonik sejak zaman kolonial.',
        ingredients: ['Kikil sapi', 'Lontong', 'Kuah kuning berkaldu', 'Serai', 'Daun jeruk purut', 'Sambal'],
        taste: 'Gurih, hangat, dan beraroma rempah',
        categories: ['berkuah', 'gurih', 'malam'],
        priceCategory: 'sedang',
        priceRange: 'Rp20.000 – Rp30.000',
        timeCategory: ['pagi', 'malam'],
        featured: true
    },
    {
        id: 'sate-klopo',
        name: 'Sate Klopo',
        image: 'img/Sate klopo.jpg',
        shortDescription: 'Sate daging sapi yang dibalut parutan kelapa berbumbu sebelum dibakar, disajikan dengan nasi atau lontong, sambal kacang, dan serundeng.',
        story: '"Klopo" berarti kelapa dalam bahasa Jawa. Sate khas Surabaya ini identik dengan kawasan Ondomohen, tempat daging sapi dibalut parutan kelapa berbumbu lalu dibakar di atas arang hingga harum. Hasilnya gurih manis dengan tekstur sedikit renyah di bagian luar.',
        ingredients: ['Daging sapi', 'Kelapa parut', 'Bumbu bawang & ketumbar', 'Sambal kacang', 'Serundeng'],
        taste: 'Gurih manis dengan aroma kelapa bakar',
        categories: ['gurih', 'malam'],
        priceCategory: 'sedang',
        priceRange: 'Rp25.000 – Rp40.000',
        timeCategory: ['pagi', 'malam'],
        featured: false
    }
];

const warungs = [
    {
        id: 'tahu-campur-cak-sadak',
        name: 'Tahu Campur Cak Sadak',
        address: 'Jl. Mayjen Sungkono No. 106, Pakis, Kec. Sawahan, Surabaya, Jawa Timur 60256',
        openDays: 'Setiap hari',
        openTime: '17:00',
        closeTime: '23:00',
        description: 'Warung gerobak kayu legendaris di kawasan Mayjen Sungkono yang terkenal dengan tahu campur dan lontong kikil berkuah gurih.',
        foodIds: ['lontong-kikil'],
        otherMenu: ['Tahu Campur'],
        image: 'img/Warung.png',
        mapsUrl: 'https://maps.app.goo.gl/5s2ocqsDTwDYwsb16'
    },
    {
        id: 'depot-selamat-sukses',
        name: 'Depot Selamat Sukses Ngagel Jaya Barat',
        address: 'Jl. Ngagel Jaya Barat No.24, RT.002/RW.06, Pucang Sewu, Kec. Gubeng, Surabaya, Jawa Timur 60283',
        openDays: 'Setiap hari',
        openTime: '07:00',
        closeTime: '21:00',
        description: 'Depot rumahan bernuansa sederhana dengan aneka masakan khas Jawa Timur dan gratis isi ulang nasi putih.',
        foodIds: ['rawon-setan', 'nasi-pecel'],
        otherMenu: ['Nasi Campur'],
        image: 'img/warung selamat sukses.png',
        mapsUrl: 'https://maps.app.goo.gl/9Tvp2K7jWLGTJj128'
    },
    {
        id: 'kedai-bang-jady',
        name: 'Kedai Bang Jady',
        address: 'Medokan Ayu, Rungkut, Surabaya, East Java 60293',
        openDays: 'Setiap hari',
        openTime: '10:00',
        closeTime: '22:00',
        description: 'Kedai kaki lima di Rungkut yang dikenal dengan menu spesial nasi telur, porsinya mengenyangkan dengan harga ramah kantong.',
        foodIds: [],
        otherMenu: ['Nasi Telur', 'Es Teh'],
        image: 'img/Kedai Bang Jady.jpg',
        mapsUrl: 'https://maps.app.goo.gl/YyiWHLXbtAo8xYy77'
    },
    {
        id: 'depot-tanjung-api',
        name: 'Depot Tanjung Api',
        address: 'Jl. Walikota Mustajab No.41, Ketabang, Kec. Genteng, Surabaya, Jawa Timur 60272',
        openDays: 'Setiap hari',
        openTime: '10:00',
        closeTime: '21:00',
        description: 'Depot bergaya modern di pusat kota dengan konsep "selera tuan dan nyonya" yang menyajikan camilan, hidangan rumahan, dan pempek.',
        foodIds: [],
        otherMenu: ['Pempek', 'Camilan', 'Hidangan Rumahan'],
        image: 'img/depot tanjung api surabaya.jpg',
        mapsUrl: 'https://maps.app.goo.gl/FXVpeHzkZ5vZ4yqw5'
    },
    {
        id: 'ceker-pedas-cocote-tonggo',
        name: 'Ceker Pedas Cocote Tonggo',
        address: 'Jl. Kombes Pol. Moh. Duryat No.33, Tegalsari, Kec. Tegalsari, Surabaya, Jawa Timur 60262',
        openDays: 'Setiap hari',
        openTime: '11:00',
        closeTime: '23:00',
        description: 'Tempat makan favorit anak muda Surabaya untuk menikmati ceker pedas berbumbu meresap dengan suasana santai.',
        foodIds: [],
        otherMenu: ['Ceker Pedas'],
        image: 'img/ceker pedas cocote tonggo.png',
        mapsUrl: 'https://maps.app.goo.gl/pa7UxQsWbcd6ETBT6'
    }
];

const faqs = [
    {
        id: 'faq-apa-itu-surobites',
        question: 'Apa itu SuroBites?',
        answer: 'SuroBites adalah website yang mengenalkan kuliner khas Surabaya, lengkap dengan deskripsi singkat, rekomendasi berdasarkan selera, serta lokasi warung yang bisa kamu kunjungi.'
    },
    {
        id: 'faq-makanan-tersedia',
        question: 'Apa saja makanan yang tersedia?',
        answer: 'Kamu bisa melihat seluruh makanan khas Surabaya di halaman Katalog, mulai dari Rawon Setan, Nasi Pecel, Tahu Tek, Rujak Cingur, Lontong Kikil, hingga Sate Klopo.'
    },
    {
        id: 'faq-lokasi-warung',
        question: 'Di mana saya dapat menemukan warung kuliner Surabaya?',
        answer: 'Buka halaman Lokasi Warung. Di sana tersedia alamat, jam buka, menu andalan, dan tautan Google Maps untuk setiap warung.'
    },
    {
        id: 'faq-cara-rekomendasi',
        question: 'Bagaimana cara mendapatkan rekomendasi kuliner?',
        answer: 'Masuk ke halaman Rekomendasi lalu pilih kategori sesuai selera atau kebutuhanmu, misalnya Pedas, Berkuah, Hemat, atau Kuliner Malam.'
    },
    {
        id: 'faq-simpan-favorit',
        question: 'Bagaimana cara menyimpan makanan favorit?',
        answer: 'Klik ikon hati pada card makanan. Semua makanan yang kamu simpan bisa dilihat kapan saja lewat ikon hati di bagian atas halaman.'
    },
    {
        id: 'faq-favorit-tersimpan',
        question: 'Apakah daftar favorit saya akan hilang saat halaman di-refresh?',
        answer: 'Tidak. Daftar favorit tersimpan di browser yang kamu gunakan, jadi tetap ada meskipun halaman di-refresh atau kamu berpindah halaman.'
    }
];

const admin = {
    username: 'admin',
    password: 'admin123',
    displayName: 'Admin SuroBites'
};

function findFood(id) {
    return foods.find(function (food) {
        return food.id === id;
    });
}

function findWarung(id) {
    return warungs.find(function (warung) {
        return warung.id === id;
    });
}

function getCategory(id) {
    return categories.find(function (category) {
        return category.id === id;
    });
}

function getPrice(id) {
    return prices.find(function (price) {
        return price.id === id;
    });
}

function getTime(id) {
    return times.find(function (time) {
        return time.id === id;
    });
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('surobites_favorites')) || [];
}

function saveFavorites(list) {
    localStorage.setItem('surobites_favorites', JSON.stringify(list));
}

function isWarungOpen(warung) {
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();
    const openParts = warung.openTime.split(':');
    const closeParts = warung.closeTime.split(':');
    const open = parseInt(openParts[0]) * 60 + parseInt(openParts[1]);
    const close = parseInt(closeParts[0]) * 60 + parseInt(closeParts[1]);
    if (close > open) {
        return current >= open && current < close;
    }
    return current >= open || current < close;
}

function formatTime(time) {
    return time.replace(':', '.');
}

function getMapsEmbed(warung) {
    return 'https://maps.google.com/maps?q=' + encodeURIComponent(warung.name + ', ' + warung.address) + '&z=16&output=embed';
}

function showToast(message, type) {
    if (!type) {
        type = 'success';
    }
    const icons = { success: '✓', error: '!', info: 'i', favorite: '♥', remove: '♡' };

    if ($('.toast-container').length === 0) {
        $('body').append('<div class="toast-container"></div>');
    }

    const toast = $('<div class="toast toast--' + type + '"><span class="toast__icon">' + icons[type] + '</span><span>' + message + '</span></div>');
    $('.toast-container').append(toast);

    setTimeout(function () {
        toast.addClass('is-leaving');
        setTimeout(function () {
            toast.remove();
        }, 300);
    }, 2500);
}

function openModal(modal) {
    if (!$('body').hasClass('modal-open')) {
        $('body').css('padding-right', window.innerWidth - $(window).width());
        $('body').addClass('modal-open');
    }
    $(modal).addClass('is-open');
    $(modal).find('.modal-dialog').scrollTop(0);
}

function closeModal(modal) {
    $(modal).removeClass('is-open');
    if ($('.modal-overlay.is-open').length === 0) {
        $('body').removeClass('modal-open').css('padding-right', '');
    }
}

$(document).on('click', '.modal-overlay', function (e) {
    if (e.target === this) {
        closeModal(this);
    }
});

$(document).on('click', '[data-modal-close]', function () {
    closeModal($(this).closest('.modal-overlay'));
});

$(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('.modal-overlay.is-open').length > 0) {
        closeModal($('.modal-overlay.is-open').last());
    }
});

function showConfirm(options, onYes) {
    if ($('#confirm-modal').length === 0) {
        $('body').append('<div class="modal-overlay modal--center modal--confirm" id="confirm-modal"><div class="modal-dialog"></div></div>');
    }

    let detail = '';
    if (options.detail) {
        detail = '<p class="confirm-box__detail">' + options.detail + '</p>';
    }

    $('#confirm-modal .modal-dialog').html(`
        <div class="confirm-box">
            <div class="confirm-box__icon confirm-box__icon--danger">${options.icon}</div>
            <h2>${options.title}</h2>
            <p>${options.message}</p>
            ${detail}
            <div class="confirm-box__actions">
                <button type="button" class="ui-btn ui-btn--ghost" data-modal-close>Batal</button>
                <button type="button" class="ui-btn ui-btn--danger" id="confirm-yes">${options.button}</button>
            </div>
        </div>`);

    $('#confirm-yes').on('click', function () {
        closeModal('#confirm-modal');
        onYes();
    });
    openModal('#confirm-modal');
}
