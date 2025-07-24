import { getDialog } from "../../modules/dom-utils.js";
import { fileServerRequest } from "./file-server-request.js";

const requestConfig = {
    deleteFile: { path: "deleteFile", action: "delete" },
    deleteFolder: { path: "deleteFolder", action: "delete" },
};

export function fileSubmitBtnHandler(request) {
    const dialogElements = getDialog(request);
    const dialog = dialogElements[`${request}Dialog`];
    const submitBtn = dialogElements[`${request}DialogSubmitBtn`];
    const dialogInput = dialogElements[`${request}DialogInput`];

    if (!submitBtn || !dialogInput) return;

    submitBtn.addEventListener("click", async (e) => {
        const filename = dialogInput.value.trim();
        if (!filename) {
            alert("File name cannot be empty.");
            return;
        }

        const option = requestConfig[request];
        if (!option) return console.error(`Unknown request type: ${request}`);

        const data = {
            request,
            folderId: dialog.dataset.folderId,
            filename,
        };

        await fileServerRequest(data, option.action);
    });
}
