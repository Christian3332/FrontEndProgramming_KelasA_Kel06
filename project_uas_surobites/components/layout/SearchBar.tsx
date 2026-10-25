"use client";

import { useState } from "react";
import type React from "react";

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

    function handleSubmit(event: Parameters<
        NonNullable<React.ComponentProps<"form">["onSubmit"]>
    >[0]) {
        event.preventDefault();
        onSearch?.(query.trim());
    }

    function handleReset() {
        setQuery("");
        onSearch?.("");
    }

    return (
        <form className="search-bar" role="search" onSubmit={handleSubmit}>
            <input 
                type="search" 
                name="q" 
                value={query} 
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label="Cari kuliner"  
            />

            {query && (
                <button
                    type="button"
                    onClick={handleReset}
                    aria-label="Hapus pencarian"
                >
                    <span>&times;</span>
                </button>
            )}

            <button type="submit" aria-label="Cari">
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
            </button>
        </form>
    );
}