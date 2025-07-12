import { attachCloseHandlers } from "./attachCloseHandlers.js";

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

export function setupModalDialog(
    openBtn,
    dialog,
    closeBtn,
    cancelBtn,
    isManagedItem = null,
    actionFunction = null
) {
    if (!openBtn || !dialog) return;

    openBtn.addEventListener("click", (e) => {
        if (isManagedItem) {
            actionFunction(e.target);
        }
        dialog.showModal();
    });

    closeOnOutsideClick(dialog);

    attachCloseHandlers(dialog, closeBtn, cancelBtn);
}
