export async function addItemData(triggerBtn, dialog) {
    const { folderId, parentId, itemId } = triggerBtn.dataset;

    dialog.dataset.folderId = folderId;
    dialog.dataset.parentId = parentId;
    dialog.dataset.itemId = itemId;
}
