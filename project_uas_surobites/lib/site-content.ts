import "server-only";
import { prisma } from "@/lib/prisma";

export const defaultSiteContent = {
  heroTitle: "JELAJAHI CITA RASA LEGENDARIS SURABAYA",
  heroDescription:
    "Nikmati Kelezatan Kuliner Warisan Kota Pahlawan. Dari pekatnya kuah Rawon daging hingga segarnya bumbu petis Rujak Cingur dan Lontong Balap. Temukan sejarah, bahan rahasia, dan rekomendasi warung asli di satu tempat.",
  rekomendasiTitle: "Temukan Kuliner yang Cocok Untukmu",
  rekomendasiDescription:
    "Bingung mau makan apa? Pilih kategori sesuai selera dan kebutuhanmu, lalu temukan rekomendasi makanan khas Surabaya yang paling pas.",
  contactEmail: "SuroBites@gmail.com",
  contactPhone: "0888777999",
  instagram: "",
  facebook: "",
};

export type SiteContent = typeof defaultSiteContent;

export async function getSiteContent(): Promise<SiteContent> {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  if (!content) return defaultSiteContent;

  return {
    heroTitle: content.heroTitle,
    heroDescription: content.heroDescription,
    rekomendasiTitle: content.rekomendasiTitle,
    rekomendasiDescription: content.rekomendasiDescription,
    contactEmail: content.contactEmail,
    contactPhone: content.contactPhone,
    instagram: content.instagram,
    facebook: content.facebook,
  };
}
