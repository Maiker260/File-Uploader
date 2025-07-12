import { showDialogNearTrigger } from "../../modules/dialogs/dialogs.js";

export function showMoreOptionsDialog(e, renameBtn, deleteBtn, dialog) {
    const triggerBtn = e.target;
    const container = triggerBtn.closest(".content-folder-container");

    if (triggerBtn.classList.contains("more-options-folder-btn")) {
        const folderId = container.dataset.folderId;
        const parentId = container.dataset.parentId || null;

        renameBtn.dataset.folderId = folderId;
        renameBtn.dataset.parentId = parentId;

        deleteBtn.dataset.folderId = folderId;
        deleteBtn.dataset.parentId = parentId;

        showDialogNearTrigger(triggerBtn, dialog, {
            marginTop: 1,
        });
    }
}
