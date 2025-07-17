import { getDialog } from "../../../modules/dom-utils.js";
import { folderServerRequest } from "./folder-server-request.js";

const requestConfig = {
    createNewFolder: { path: "newFolder", action: "create" },
    deleteFolder: { path: "deleteFolder", action: "delete" },
    renameFolder: { path: "renameFolder", action: "rename" },
};

export function submitBtnHandler(request) {
    const dialogElements = getDialog(request);
    const dialog = dialogElements[`${request}Dialog`];
    const submitBtn = dialogElements[`${request}DialogSubmitBtn`];
    const dialogInput = dialogElements[`${request}DialogInput`];

    if (!submitBtn || !dialogInput) return;

    submitBtn.addEventListener("click", async (e) => {
        const folderName = dialogInput.value.trim();
        if (!folderName) {
            alert("Folder name cannot be empty.");
            return;
        }

        const data = {
            folderId: dialog.dataset.folderId,
            parentId: dialog.dataset.parentId,
            placeIn: dialog.dataset.folderId,
            folderName,
        };

        const option = requestConfig[request];
        if (!option) return console.error(`Unknown request type: ${request}`);

        await folderServerRequest(data, option.path, option.action);
    });
}
