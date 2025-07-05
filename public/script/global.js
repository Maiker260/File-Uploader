const getbyId = (id) => document.getElementById(id);

const getDialog = (dialogName) => {
    const get = (suffix) => getbyId(`${dialogName}${suffix}`);

    return {
        [`${dialogName}Dialog`]: get("Dialog"),
        [`${dialogName}Btn`]: get("Btn"),
        [`${dialogName}DialogCloseBtn`]: get("DialogCloseBtn"),
        [`${dialogName}DialogCancelBtn`]: get("DialogCancelBtn"),
        [`${dialogName}DialogSubmitBtn`]: get("DialogSubmitBtn"),
    };
};

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
    uploadFileDialogSubmitBtn,
} = getDialog("uploadFile");

const {
    createNewFolderDialog,
    createNewFolderBtn,
    createNewFolderDialogCloseBtn,
    createNewFolderDialogCancelBtn,
    createNewFolderDialogSubmitBtn,
} = getDialog("createNewFolder");

function setupToggleSidebar(triggerBtn, sidebar, extraToggleClass = null) {
    if (!triggerBtn || !sidebar) return;

    triggerBtn.addEventListener("click", (e) => {
        if (sidebar.dataset.active == "true") {
            arrow.classList.remove(extraToggleClass);
            sidebar.dataset.active = "false";
        } else {
            arrow.classList.add(extraToggleClass);
            sidebar.dataset.active = "true";
        }
    });
}

function toggleDialog(triggerBtn, dialog) {
    if (!triggerBtn || !dialog) return;

    triggerBtn.addEventListener("click", () => {
        if (dialog.open) {
            dialog.close();
        } else {
            dialog.show();
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !triggerBtn.contains(event.target) &&
            dialog.open &&
            !dialog.contains(event.target)
        ) {
            dialog.close();
        }
    });
}

function closeOnOutsideClick(dialog) {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });
}

function setupModalDialog(openBtn, dialog, closeBtn) {
    if (openBtn && dialog) {
        openBtn.addEventListener("click", () => dialog.showModal());
        closeOnOutsideClick(dialog);
    }
    if (closeBtn) {
        closeBtn.addEventListener("click", () => dialog.close());
    }
}

toggleDialog(userData, userDataDialog);
setupToggleSidebar(arrow, arrow, "rotated");
setupModalDialog(uploadFileBtn, uploadFileDialog, uploadFileDialogCloseBtn);
setupModalDialog(
    createNewFolderBtn,
    createNewFolderDialog,
    createNewFolderDialogCloseBtn
);

// NEED TO REPLACE WHEN THE SIDEBAR EXISTS
// setupToggleSidebar(userInfo, sidebar, "rotated");
