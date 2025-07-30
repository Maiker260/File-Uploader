import { showBanner } from "../../modules/show-banner.js";

export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);

        showBanner("Copied!");
    } catch (err) {
        console.error("Failed to copy text to clipboard:", err);

        showBanner("Failed to copy!");
    }
}
