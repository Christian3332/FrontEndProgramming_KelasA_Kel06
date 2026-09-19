document.addEventListener("DOMContentLoaded", () => {
    // Function Smooth Scrolling
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // INTERAKSI PADA KARTU MENU
    const menuCards = document.querySelectorAll(".card");

    menuCards.forEach((card) => {
        card.style.cursor = "pointer";

        card.addEventListener("click", () => {
            const namaKopi = card.querySelector("h3").innerText;

            alert(`Pilihan yang bagus! Anda memilih ${namaKopi}. Kunjungi kedai kami untuk memesan.`);
        });
    });

    const originalTitle = document.title;

    window.addEventListener("blur", () => {
        document.title = "Jangan lupa ngopi!";
    });

    window.addEventListener("focus", () => {
        document.title = originalTitle;
    });
});