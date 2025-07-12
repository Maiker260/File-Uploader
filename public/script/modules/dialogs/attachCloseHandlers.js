export function attachCloseHandlers(dialog, closeBtn, cancelBtn) {
    if (closeBtn) {
        closeBtn.addEventListener("click", () => dialog.close());
    }
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => dialog.close());
    }
}
