import { getbyId } from "../../modules/dom-utils.js";
import { showMoreOptionsDialog } from "./show-more-options-dialog.js";
import { deleteFolder } from "./delete-folder.js";
import { renameFolder } from "./rename-folder.js";

export function initFolderOptionsDialog() {
    document.addEventListener("DOMContentLoaded", () => {
        const { folderOptionsDialog, renameFolderBtn, deleteFolderBtn } = {
            folderOptionsDialog: getbyId("folderOptionsDialog"),
            renameFolderBtn: getbyId("renameFolderBtn"),
            deleteFolderBtn: getbyId("deleteFolderBtn"),
        };

        document
            .querySelector(".folders-section-content-data")
            .addEventListener("click", (event) => {
                showMoreOptionsDialog(
                    event,
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

        deleteFolderBtn.addEventListener("click", async () => {
            await deleteFolder(deleteFolderBtn.dataset.folderId);
        });

        renameFolderBtn.addEventListener("click", async () => {
            await renameFolder(renameFolderBtn.dataset.folderId);
        });
    });
}
