import { getbyId } from "../../modules/dom-utils.js";
import { copyToClipboard } from "./copy-to-clipboard.js";

export const shareFileAction = (clickedBtn, dialog) => {
    const container = clickedBtn.closest(".file-data");
    const shareURL = getbyId("shareFileCopyURL");
    const copyBtn = getbyId("copyToClipboardBtn");

    if (shareURL && container?.dataset?.id) {
        shareURL.value = `${window.location.origin}/myfiles/file/${container.dataset.id}`;
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            await copyToClipboard(shareURL.value);
        });
    }
};
