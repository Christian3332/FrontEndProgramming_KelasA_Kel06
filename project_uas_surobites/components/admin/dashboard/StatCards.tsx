"use client";

import Link from "next/link";
import { foods, warungs } from "@/data/foods";
import { faqs } from "@/data/faqs";
import { useFavorites } from "@/lib/favorites";

export default function StatCards() {
  const { favorites } = useFavorites();
  const favoriteCount = foods.filter((food) => favorites.includes(food.id)).length;

  const stats = [
    {
      label: "Jumlah makanan",
      value: foods.length,
      icon: "fa-solid fa-bowl-food",
      color: "",
      hint: "Tampil di Katalog & Rekomendasi",
      href: "/admin/dashboard/makanan",
    },
    {
      label: "Jumlah warung",
      value: warungs.length,
      icon: "fa-solid fa-location-dot",
      color: "orange",
      hint: "Tampil di Lokasi Warung",
      href: "/admin/dashboard/warung",
    },
    {
      label: "Jumlah FAQ",
      value: faqs.length,
      icon: "fa-regular fa-comments",
      color: "",
      hint: "Tampil di Beranda",
      href: "/admin/dashboard/faq",
    },
    {
      label: "Makanan difavoritkan",
      value: favoriteCount,
      icon: "fa-solid fa-heart",
      color: "red",
      hint: "Disimpan pengunjung di browser ini",
      href: "/favorit",
    },
  ];

  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <Link key={stat.label} href={stat.href} className="stat-card">
          <span className="stat-card__top">
            <span className="stat-card__label">{stat.label}</span>
            <span className={`stat-card__icon stat-card__icon--${stat.color}`}>
              <i className={stat.icon}></i>
            </span>
          </span>
          <strong className="stat-card__value">{stat.value}</strong>
          <span className="stat-card__hint">{stat.hint}</span>
        </Link>
      ))}
    </div>
  );
}
