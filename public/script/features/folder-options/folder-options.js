import { getbyId } from "../../modules/dom-utils.js";
import { showMoreOptionsDialog } from "./show-more-options-dialog.js";

export function initFolderOptionsDialog() {
    document.addEventListener("DOMContentLoaded", () => {
        const { folderOptionsDialog, renameFolderBtn, deleteFolderBtn } = {
            folderOptionsDialog: getbyId("folderOptionsDialog"),
            renameFolderBtn: getbyId("renameFolderBtn"),
            deleteFolderBtn: getbyId("deleteFolderBtn"),
        };

        document
            .querySelector(".folders-section-content-data")
            .addEventListener("click", (e) => {
                showMoreOptionsDialog(
                    e,
                    renameFolderBtn,
                    deleteFolderBtn,
                    folderOptionsDialog
                );
            });

        document.addEventListener("click", (event) => {
            if (
                folderOptionsDialog.open &&
                !folderOptionsDialog.contains(event.target) &&
                !event.target.classList.contains("more-options-folder-btn")
            ) {
                folderOptionsDialog.close();
            }
        });

        deleteFolderBtn.addEventListener("click", () => {
            alert(deleteFolderBtn.dataset.folderId);
        });

        renameFolderBtn.addEventListener("click", () => {
            alert(renameFolderBtn.dataset.folderId);
        });
    });
}
