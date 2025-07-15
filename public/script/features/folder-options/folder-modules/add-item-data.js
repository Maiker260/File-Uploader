export async function addItemData(triggerBtn, dialog) {
    const { folderId, parentId } = triggerBtn.dataset;

    dialog.dataset.folderId = folderId;
    dialog.dataset.parentId = parentId;
}
