$(document).ready(function () {
    // Judul asli halaman (disimpan untuk dikembalikan saat tab kembali aktif)
    const judulAsli = document.title;

    // Tombol Like dengan counter
    $(".row").on("click", ".like-btn", function () {
        const $tombol = $(this);
        const jumlah = ($tombol.data("jumlah") || 0) + 1;
        $tombol.data("jumlah", jumlah);

        $tombol.find(".like-count").hide().text(jumlah).fadeIn(200);
        $tombol.find(".like-icon").html("&#9829;");
        // Ganti gaya outline menjadi solid (class Bootstrap)
        $tombol.removeClass("btn-outline-primary").addClass("btn-primary");
    });

    // Smooth scrolling (dengan offset tinggi navbar sticky)
    $('a[href^="#"]').on("click", function (e) {
        const $tujuan = $(this.hash);
        if (!$tujuan.length) return;

        e.preventDefault();
        const offset = $(".navbar").outerHeight() || 0;

        $("html, body").stop().animate(
            { scrollTop: $tujuan.offset().top - offset },
            600
        );

        // Tutup menu navbar (mode mobile) setelah link diklik
        $("#navMenu.show").collapse("hide");
    });

    // Judul tab dinamis
    $(window).on("blur", function () {
        document.title = "Jangan lupa ngopi!";
    });

    $(window).on("focus", function () {
        document.title = judulAsli;
    });
});s