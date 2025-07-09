import { getbyId, getDialog } from "./modules/dom-utils.js";
import { toggleDialog, setupModalDialog } from "./modules/dialogs.js";
import { setupToggleSidebar } from "./modules/sidebar.js";
import { initFolderCreationDialog } from "./features/create-new-folder.js";

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
toggleDialog(userData, userDataDialog);

setupModalDialog(
    uploadFileBtn,
    uploadFileDialog,
    uploadFileDialogCloseBtn,
    uploadFileDialogCancelBtn
);

setupModalDialog(
    createNewFolderBtn,
    createNewFolderDialog,
    createNewFolderDialogCloseBtn,
    createNewFolderDialogCancelBtn
);

initFolderCreationDialog();
