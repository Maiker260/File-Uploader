export function showDialogNearTrigger(triggerBtn, dialog, options = {}) {
    if (!triggerBtn || !dialog) return;

    const { marginTop = 8 } = options;

    const rect = triggerBtn.getBoundingClientRect();
    dialog.style.position = "absolute";
    dialog.style.top = `${rect.bottom + window.scrollY + marginTop}px`;
    dialog.style.left = `${rect.left + window.scrollX}px`;

    if (dialog.open) {
        dialog.close();
    } else {
        dialog.show();
    }
}

export function closeOnOutsideClick(dialog) {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });
}

export function setupModalDialog(openBtn, dialog, closeBtn, cancelBtn) {
    if (openBtn && dialog) {
        openBtn.addEventListener("click", () => dialog.showModal());
        closeOnOutsideClick(dialog);
    }
    if (closeBtn || cancelBtn) {
        closeBtn.addEventListener("click", () => dialog.close());
        cancelBtn.addEventListener("click", () => dialog.close());
    }
}
