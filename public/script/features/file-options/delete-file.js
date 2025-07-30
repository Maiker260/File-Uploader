import { getDialog } from "../../modules/dom-utils.js";
import { fileServerRequest } from "./file-server-request.js";
import { showBanner } from "../../modules/show-banner.js";

const requestConfig = {
    deleteFile: { path: "deleteFile", action: "delete" },
};

export function deleteFileHandler(request) {
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
        const inputValue = dialogInput.value.trim();
        if (!inputValue) {
            alert("Input name cannot be empty.");
            return;
        }

        const option = requestConfig[request];
        if (!option) return console.error(`Unknown request type: ${request}`);

        const data = {
            request,
            inputValue,
            itemId: dialog.dataset.itemId,
        };

        showBanner("Deleting", true);

        await fileServerRequest(data, option.action);
    };

    // Store the handler so it can be removed later
    submitBtn._handler = handleClick;

    submitBtn.addEventListener("click", handleClick);
}
