import { getDialog } from "../../../modules/dom-utils.js";
import { setupModalDialog } from "../../../modules/dialogs/dialogs.js";
import { addItemData } from "./add-item-data.js";

export function initFolderOptionDialog() {
    const dialogs = [
        { name: "renameFolder", action: (btn) => addItemData(btn) },
        { name: "deleteFolder", action: (btn) => addItemData(btn) },
    ];

    dialogs.forEach(({ name, action }) => {
        const {
            [`${name}Dialog`]: dialog,
            [`${name}Btn`]: btn,
            [`${name}DialogCloseBtn`]: closeBtn,
            [`${name}DialogCancelBtn`]: cancelBtn,
        } = getDialog(name);

        setupModalDialog(btn, dialog, closeBtn, cancelBtn, true, action);
    });
}
