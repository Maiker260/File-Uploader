import { showCopyBanner } from "./show-copy-banner.js";

export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);

        showCopyBanner("Copied!");
    } catch (err) {
        console.error("Failed to copy text to clipboard:", err);

        showCopyBanner("Failed to copy!");
    }
}
