export function toggleDialog(triggerBtn, dialog) {
    if (!triggerBtn || !dialog) return;

    triggerBtn.addEventListener("click", () => {
        if (dialog.open) {
            dialog.close();
        } else {
            dialog.show();
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !triggerBtn.contains(event.target) &&
            dialog.open &&
            !dialog.contains(event.target)
        ) {
            dialog.close();
        }
    });
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
