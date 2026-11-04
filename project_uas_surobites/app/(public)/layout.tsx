import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteContent } from "@/lib/site-content";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await connection();
    const content = await getSiteContent();

    return (
        <>
            <Header />
            <main id="main-content" className="flex-grow-1">{children}</main>
            <Footer content={content} />
        </>
    );
}
