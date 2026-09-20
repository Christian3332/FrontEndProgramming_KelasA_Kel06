$(document).ready(function () {
    $(".faq-question").on("click", function () {
        const $pertanyaan = $(this); 
        const $jawaban = $pertanyaan.next(".faq-answer");
        $(".faq-question").not($pertanyaan)
            .removeClass("active")  
            .attr("aria-expanded", "false")
            .next(".faq-answer").slideUp(300);        
        $pertanyaan.toggleClass("active");
        $pertanyaan.attr("aria-expanded", $pertanyaan.hasClass("active"));
        $jawaban.slideToggle(300); 
    });

    $(".card .card-body").append(
        '<button type="button" class="like-btn" aria-label="Sukai menu ini">' +
            '<span class="like-icon">&#9825;</span> ' +
            '<span class="like-count">0</span>' +
        '</button>'
    );
 
    $(".card-container").on("click", ".like-btn", function () {
        const $tombol = $(this);
        const $angka = $tombol.find(".like-count");

        const jumlah = ($tombol.data("jumlah") || 0) + 1;
        $tombol.data("jumlah", jumlah);
 
        $angka.hide().text(jumlah).fadeIn(200);
 
        $tombol.addClass("liked");
        $tombol.find(".like-icon").html("&#9829;");
    });
 

    $(".card").css("cursor", "pointer");
 
    $(".card-container").on("click", ".card", function (e) {
        if ($(e.target).closest(".like-btn").length) {
            return;
        }
 
        const namaMenu = $(this).find("h3").text();
        alert("Pilihan yang bagus! Anda memilih " + namaMenu +
              ". Kunjungi kedai kami untuk memesan.");
    });
 
 
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
 
        const $tujuan = $(this.hash);
 
        if ($tujuan.length) {
            $("html, body").stop().animate(
                { scrollTop: $tujuan.offset().top },
                600                                   
            );
        }
    });

    $(window).on("blur", function () {
        document.title = "Jangan lupa ngopi!";
    });
    $(window).on("focus", function () {
        document.title = judulAsli;
    });
});