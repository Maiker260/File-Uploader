import { getDialog } from "../modules/dom-utils.js";
import { folderServerRequest } from "./folder-options/folder-modules/folder-server-request.js";

export function initFolderCreationDialog() {
    document.addEventListener("DOMContentLoaded", () => {
        const { createNewFolderDialogSubmitBtn, createNewFolderDialogInput } =
            getDialog("createNewFolder");

        if (!createNewFolderDialogSubmitBtn || !createNewFolderDialogInput)
            return;

        createNewFolderDialogSubmitBtn.addEventListener("click", async (e) => {
            const folderName = createNewFolderDialogInput.value.trim();
            if (!folderName) {
                alert("Folder name cannot be empty.");
                return;
            }

            await folderServerRequest({ folderName }, "newFolder", "create");
        });
    });
}
