import { getbyId } from "../../modules/dom-utils.js";
import { copyToClipboard } from "./copy-to-clipboard.js";

export const shareFileAction = (clickedBtn, dialog) => {
    const container = clickedBtn.closest(".file-data");
    const shareURL = getbyId("shareFileCopyURL");
    const copyBtn = getbyId("copyToClipboardBtn");
    const shareFileData = getbyId("shareFileData");
    const visibilityCheckbox = getbyId("changeFileVisibility");

    if (shareFileData) {
        shareFileData.value = dialog.dataset?.itemId;
    }

    if (shareURL && container?.dataset?.id) {
        shareURL.value = `${window.location.origin}/myfiles/file/${container.dataset.id}`;
    }

    const isPublic = clickedBtn.dataset?.public === "true";

    if (visibilityCheckbox) {
        visibilityCheckbox.checked = isPublic;
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            await copyToClipboard(shareURL.value);
        });
    }
};
