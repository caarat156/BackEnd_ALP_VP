"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExternal = fetchExternal;
async function fetchExternal(url) {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error("Failed to fetch external API");
    return res.json();
}
