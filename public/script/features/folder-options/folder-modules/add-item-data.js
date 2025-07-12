import { renameFolder } from "../rename-folder.js";

export async function addItemData(triggerBtn) {
    const dataset = triggerBtn.dataset;
    const { folderId } = dataset;
    const { parentId } = dataset;

    // await renameFolder({ folderId, parentId });
}
