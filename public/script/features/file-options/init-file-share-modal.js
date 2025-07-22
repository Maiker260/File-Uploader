import { setupModalDialog } from "../../modules/dialogs/dialogs.js";
import { getDialog } from "../../modules/dom-utils.js";
import { getbyId } from "../../modules/dom-utils.js";
import { copyToClipboard } from "./copy-to-clipboard.js";

export function initFileShareModal() {
    document.addEventListener("DOMContentLoaded", () => {
        const {
            shareFileDialog,
            shareFileDialogCloseBtn,
            shareFileDialogCancelBtn,
        } = getDialog("shareFile");

        document.querySelectorAll(".file-share-btn").forEach((btn) => {
            setupModalDialog(
                btn,
                shareFileDialog,
                shareFileDialogCloseBtn,
                shareFileDialogCancelBtn,
                true,
                (clickedBtn, dialog) => {
                    const container = clickedBtn.closest(".file-data");
                    const shareURL = getbyId("shareFileCopyURL");
                    const copyBtn = getbyId("copyToClipboardBtn");

                    if (shareURL && container?.dataset?.id) {
                        shareURL.value = `/myfiles/file/${container.dataset.id}`;
                    }

                    if (copyBtn) {
                        copyBtn.addEventListener("click", async () => {
                            await copyToClipboard(shareURL.value);
                        });
                    }
                }
            );
        });
    });
}
