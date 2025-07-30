import { copyToClipboard } from "./copy-to-clipboard.js";

export function initCopyUrlBtn() {
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".file-copy-url-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const container = btn.closest(".file-data");
                if (!container || !container.dataset.id) return;

                if (!container?.dataset?.id) {
                    console.warn("Missing file ID in .file-data");
                    return;
                }

                const shareURL = `${window.location.origin}/myfiles/file/${container.dataset.id}`;
                await copyToClipboard(shareURL);
            });
        });
    });
}
