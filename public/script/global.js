const getbyId = (id) => document.getElementById(id);

const { arrow, userData, userDataDialog } = {
    arrow: getbyId("arrow"),
    userData: getbyId("userData"),
    userDataDialog: getbyId("userDataDialog"),
};

const {
    UploadBtn,
    UploadFileDialog,
    UploadFileDialogCloseBtn,
    UploadFileDialogCancelBtn,
    UploadFileDialogSubmitBtn,
} = {
    UploadBtn: getbyId("UploadBtn"),
    UploadFileDialog: getbyId("UploadFileDialog"),
    UploadFileDialogCloseBtn: getbyId("UploadFileDialogCloseBtn"),
    UploadFileDialogCancelBtn: getbyId("UploadFileDialogCancelBtn"),
    UploadFileDialogSubmitBtn: getbyId("UploadFileDialogSubmitBtn"),
};

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
setupModalDialog(UploadBtn, UploadFileDialog, UploadFileDialogCloseBtn);

// NEED TO REPLACE WHEN THE SIDEBAR EXISTS
// setupToggleSidebar(userInfo, sidebar, "rotated");
