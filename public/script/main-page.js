import { getbyId, getDialog } from "./modules/dom-utils.js";
import {
    showDialogNearTrigger,
    setupModalDialog,
} from "./modules/dialogs/dialogs.js";
import { setupToggleSidebar } from "./modules/sidebar.js";
import { initFolderCreationDialog } from "./features/create-new-folder.js";
import { initFolderOptionsDialog } from "./features/folder-options/folder-options.js";

const { arrow, userData, userDataDialog } = {
    arrow: getbyId("arrow"),
    userData: getbyId("userData"),
    userDataDialog: getbyId("userDataDialog"),
};

const {
    uploadFileDialog,
    uploadFileBtn,
    uploadFileDialogCloseBtn,
    uploadFileDialogCancelBtn,
} = getDialog("uploadFile");

const {
    createNewFolderDialog,
    createNewFolderBtn,
    createNewFolderDialogCloseBtn,
    createNewFolderDialogCancelBtn,
} = getDialog("createNewFolder");

// NEED TO REPLACE WHEN THE SIDEBAR EXISTS
// setupToggleSidebar(userData, sidebar, "rotated");
setupToggleSidebar(arrow, arrow, "rotated");
showDialogNearTrigger(userData, userDataDialog);

// Upload Modal
setupModalDialog(
    uploadFileBtn,
    uploadFileDialog,
    uploadFileDialogCloseBtn,
    uploadFileDialogCancelBtn
);

// Create Folder Modal
setupModalDialog(
    createNewFolderBtn,
    createNewFolderDialog,
    createNewFolderDialogCloseBtn,
    createNewFolderDialogCancelBtn
);

initFolderCreationDialog();
initFolderOptionsDialog();

// NEED TO REFACTOR THIS FILE
