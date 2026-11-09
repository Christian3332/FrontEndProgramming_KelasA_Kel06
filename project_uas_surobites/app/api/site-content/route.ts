import { isAdminAuthenticated } from "@/lib/admin-auth";
import { defaultSiteContent, getSiteContent } from "@/lib/site-content";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getSiteContent());
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ message: "Data konten tidak valid." }, { status: 400 });
  }

  const data = body as Record<keyof typeof defaultSiteContent, unknown>;
  const fields = Object.keys(defaultSiteContent) as (keyof typeof defaultSiteContent)[];

  if (fields.some((field) => typeof data[field] !== "string")) {
    return Response.json({ message: "Lengkapi semua kolom konten dengan benar." }, { status: 400 });
  }

  const content = Object.fromEntries(
    fields.map((field) => [field, (data[field] as string).trim()]),
  ) as typeof defaultSiteContent;

  if (
    !content.heroTitle ||
    !content.heroDescription ||
    !content.rekomendasiTitle ||
    !content.rekomendasiDescription ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.contactEmail) ||
    !/^\+?[\d\s().-]{6,30}$/.test(content.contactPhone)
  ) {
    return Response.json({ message: "Periksa judul, deskripsi, email, dan nomor telepon." }, { status: 400 });
  }

  // gambar cuma boleh dari folder public sendiri atau hasil upload di vercel blob
  const imagePattern = /^(\/(img|uploads)\/|https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/uploads\/)[^?#]+$/;
  if ([content.heroImage, content.rekomendasiImage].some((image) => !imagePattern.test(image))) {
    return Response.json({ message: "Gambar hero tidak valid." }, { status: 400 });
  }

  if ([content.instagram, content.facebook].some((link) => !validSocialLink(link))) {
    return Response.json({ message: "Tautan media sosial harus berupa URL HTTP atau HTTPS." }, { status: 400 });
  }

  if (fields.some((field) => content[field].length > maxLength(field))) {
    return Response.json({ message: "Ada kolom yang melebihi batas karakter." }, { status: 400 });
  }

  try {
    await prisma.siteContent.upsert({
      where: { id: 1 },
      create: { id: 1, ...content },
      update: content,
    });
    return Response.json({ message: "Konten berhasil disimpan." });
  } catch {
    return Response.json({ message: "Konten gagal disimpan." }, { status: 500 });
  }
}

function validSocialLink(link: string) {
  if (!link) return true;

  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function maxLength(field: keyof typeof defaultSiteContent) {
  if (field === "heroTitle" || field === "rekomendasiTitle") return 80;
  if (field === "heroDescription" || field === "rekomendasiDescription") return 400;
  if (field === "contactEmail") return 120;
  if (field === "contactPhone") return 30;
  return 200;
}
