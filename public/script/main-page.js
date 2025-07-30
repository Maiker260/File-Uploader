import { getbyId, getDialog } from "./modules/dom-utils.js";
import {
    showDialogNearTrigger,
    setupModalDialog,
} from "./modules/dialogs/dialogs.js";
import { setupToggleSidebar } from "./modules/sidebar.js";

import { initFolderModals } from "./features/init-folder-modals.js";
import { initFolderOptionsDialog } from "./features/folder-options/init-folder-options-dialog.js";
import { transformFileDate } from "./transform-file-date.js";
import { initCopyUrlBtn } from "./features/file-options/copy-url.js";
import { handleFileUploadSelection } from "./features/upload-file/handle-file-upload-selection.js";
import { manageFile } from "./features/file-options/manage-file.js";

// DOM elements
const arrow = getbyId("arrow");
const userData = getbyId("userData");
const userDataDialog = getbyId("userDataDialog");

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

// Setup UI behavior
// NEED TO REPLACE WHEN THE SIDEBAR EXISTS
// setupToggleSidebar(userData, sidebar, "rotated");
setupToggleSidebar(arrow, arrow, "rotated");
showDialogNearTrigger(userData, userDataDialog);

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

// Initialize features
initFolderModals();
initFolderOptionsDialog();
initCopyUrlBtn();
handleFileUploadSelection();
manageFile();

// Format file dates
transformFileDate();
