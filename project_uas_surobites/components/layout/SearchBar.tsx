"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "@/app/styles/search-bar.module.css";

type SearchBarProps = {
    onSearch?: (query: string) => void;
    placeholder?: string;
    initialValue?: string;
};

export default function SearchBar({
    onSearch,
    placeholder = "Cari kuliner Surabaya...",
    initialValue = "",
}: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const router = useRouter();

    function handleSubmit(event: Parameters<
        NonNullable<React.ComponentProps<"form">["onSubmit"]>
    >[0]) {
        event.preventDefault();

        // kalau tidak dikasih onSearch, langsung cari di halaman katalog
        if (onSearch) {
            onSearch(query.trim());
        } else if (query.trim() !== "") {
            router.push(`/katalog?q=${encodeURIComponent(query.trim())}`);
        }
    }

    function handleReset() {
        setQuery("");
        onSearch?.("");
    }

    return (
        <Form className={`d-flex align-items-center gap-2 mx-auto my-4 px-3 ${styles.searchBar}`} role="search" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label="Cari kuliner"
                className={`rounded-pill ${styles.input}`}
            />

            {query && (
                <Button
                    variant="light"
                    onClick={handleReset}
                    aria-label="Hapus pencarian"
                    className={`rounded-circle ${styles.iconButton}`}
                >
                    <span>&times;</span>
                </Button>
            )}

            <Button type="submit" variant="primary" aria-label="Cari" className={`rounded-circle ${styles.iconButton}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
            </Button>
        </Form>
    );
}
