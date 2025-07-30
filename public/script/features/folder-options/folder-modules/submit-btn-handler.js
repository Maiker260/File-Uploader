import { getDialog } from "../../../modules/dom-utils.js";
import { folderServerRequest } from "./folder-server-request.js";
import { showBanner } from "../../../modules/show-banner.js";

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

    // Remove previous listener if it exists
    if (submitBtn._handler) {
        submitBtn.removeEventListener("click", submitBtn._handler);
    }

    const handleClick = async () => {
        console.log("Attaching click listener to", submitBtn);

        const folderName = dialogInput.value.trim();
        if (!folderName) {
            alert("Input cannot be empty.");
            return;
        }

        const data = {
            folderId: dialog.dataset.folderId,
            parentId: dialog.dataset.parentId,
            placeIn: dialog.dataset.folderId,
            folderName,
        };

        const option = requestConfig[request];
        if (!option) {
            console.error(`Unknown request type: ${request}`);
            return;
        }

        showBanner("Processing", true);

        await folderServerRequest(data, option.path, option.action);
    };

    // Store handler on the button so it can be removed later
    submitBtn._handler = handleClick;

    submitBtn.addEventListener("click", handleClick);
}
