import { showDialogNearTrigger } from "../../modules/dialogs.js";

export function showMoreOptionsDialog(e, renameBtn, deleteBtn, dialog) {
    const triggerBtn = e.target;
    const container = triggerBtn.closest(".content-folder-container");

    if (triggerBtn.classList.contains("more-options-folder-btn")) {
        const folderId = container.dataset.folderId;

        renameBtn.dataset.folderId = folderId;
        deleteBtn.dataset.folderId = folderId;

        showDialogNearTrigger(triggerBtn, dialog, {
            marginTop: 1,
        });
    }
}
