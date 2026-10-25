import Link from "next/link";
import Image from "next/image"
import FavCount from "@/components/layout/FavCount";

export function Header () {
    return (
        <header className="header">
            <Link href="/" className="logo" aria-label="Surobites - Beranda">
                <Image src="/img/Surobites Logo.png" alt="Logo SuroBites" width={32} height={32}
                />
            </Link>

            <Link href="/favorit" className="header-fav" aria-label="Favorit Saya">
                <i className="fa-regular fa-heart"/>
                <FavCount />
            </Link>

            <nav className="navbar">
                <ul className="navbar-links">
                    <li><Link href="/" className="active">Beranda</Link></li>
                    <li><Link href="/rekomendasi">Rekomendasi</Link></li>
                    <li><Link href="/katalog">Katalog</Link></li>
                    <li><Link href="/lokasi">Lokasi Warung</Link></li>
                </ul>
            </nav>

            <form className="search-bar" action="/katalog">
                <label className="visually-hidden" htmlFor="search-input">
                    Cari kuliner
                </label>
                <input id="search-input" type="text" name="q" placeholder="Cari kuliner..." />
            </form>
        </header>
    );
}