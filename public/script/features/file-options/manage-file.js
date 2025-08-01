import { getDialog } from "../../modules/dom-utils.js";
import { setupModalDialog } from "../../modules/dialogs/dialogs.js";
import { shareFileAction } from "./share-file-action.js";
import { deleteFileHandler } from "./delete-file.js";
import { addItemData } from "../../modules/add-item-data.js";
import { submitBtnHandler } from "../folder-options/folder-modules/submit-btn-handler.js";

const modals = [
    {
        name: "shareFile",
        action: shareFileAction,
    },
    {
        name: "deleteFile",
        action: () => deleteFileHandler("deleteFile"),
    },
    {
        name: "deleteFolder",
        action: () => submitBtnHandler("deleteFolder"),
    },
];

export function manageFile() {
    document.addEventListener("DOMContentLoaded", () => {
        const dialogMap = {};

        modals.forEach(({ name, action }) => {
            const {
                [`${name}Dialog`]: dialog,
                [`${name}DialogCloseBtn`]: closeBtn,
                [`${name}DialogCancelBtn`]: cancelBtn,
            } = getDialog(name);

            dialogMap[name] = { dialog, closeBtn, cancelBtn, action };
        });

        document.querySelectorAll(".content-folder-icon").forEach((btn) => {
            const dialogType = btn.dataset.dialog;

            if (dialogMap[dialogType]) {
                const { dialog, closeBtn, cancelBtn, action } =
                    dialogMap[dialogType];

                btn.addEventListener("click", () => {
                    addItemData(btn, dialog);
                });

                setupModalDialog(
                    btn,
                    dialog,
                    closeBtn,
                    cancelBtn,
                    true,
                    action
                );
            }
        });
    });
}
