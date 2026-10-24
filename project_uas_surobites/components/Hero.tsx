import Link from "next/link";

export default function Hero() {
  return (
    <section id="beranda" className="hero-section">
      <div className="hero-content">
        <h2>JELAJAHI CITA RASA LEGENDARIS SURABAYA</h2>
        <p>
          Nikmati Kelezatan Kuliner Warisan Kota Pahlawan. Dari pekatnya kuah
          Rawon daging hingga segarnya bumbu petis Rujak Cingur dan Lontong
          Balap. Temukan sejarah, bahan rahasia, dan rekomendasi warung asli di
          satu tempat.
        </p>
        <div className="hero-buttons">
          <a href="#katalog" className="btn-primary">
            Eksplorasi Menu
          </a>
          <Link href="/rekomendasi" className="btn-secondary desktop-section">
            Rekomendasi
          </Link>
        </div>
      </div>
    </section>
  );
}
