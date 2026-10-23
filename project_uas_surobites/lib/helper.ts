// Function membersihkan text
export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

// Function mencari data menggunakan kata kunci
export function searchItems<T>(
    items: T[],
    query: string,
    getSearchText: (item: T) => string
): T[] {
    const keyword = normalizeText(query);

    if (!keyword) return items;

    return items.filter((item) =>
        normalizeText(getSearchText(item)).includes(keyword)
    );
}

