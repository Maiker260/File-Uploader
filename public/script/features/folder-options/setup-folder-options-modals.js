import { getDialog } from "../../modules/dom-utils.js";
import { setupModalDialog } from "../../modules/dialogs/dialogs.js";
import { addItemData } from "./folder-modules/add-item-data.js";

export function setupFolderOptionsModals() {
    const modals = [
        {
            name: "renameFolder",
            action: (btn, dialog) => addItemData(btn, dialog),
        },
        {
            name: "deleteFolder",
            action: (btn, dialog) => addItemData(btn, dialog),
        },
    ];

    modals.forEach(({ name, action }) => {
        const {
            [`${name}Dialog`]: dialog,
            [`${name}Btn`]: btn,
            [`${name}DialogCloseBtn`]: closeBtn,
            [`${name}DialogCancelBtn`]: cancelBtn,
        } = getDialog(name);

        setupModalDialog(btn, dialog, closeBtn, cancelBtn, true, action);
    });
}
