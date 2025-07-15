import { submitBtnHandler } from "./folder-options/folder-modules/submit-btn-handler.js";

export function initFolderModals() {
    document.addEventListener("DOMContentLoaded", async () => {
        submitBtnHandler("createNewFolder");
        submitBtnHandler("renameFolder");
        submitBtnHandler("deleteFolder");
    });
}
