import { getDialog } from "../modules/dom-utils.js";

export function initFolderCreationDialog() {
    document.addEventListener("DOMContentLoaded", () => {
        const { createNewFolderDialogSubmitBtn, createNewFolderDialogInput } =
            getDialog("createNewFolder");

        if (!createNewFolderDialogSubmitBtn || !createNewFolderDialogInput)
            return;

        createNewFolderDialogSubmitBtn.addEventListener("click", async (e) => {
            const folderName = createNewFolderDialogInput.value.trim();
            if (!folderName) {
                alert("Folder name cannot be empty.");
                return;
            }

            try {
                const res = await fetch("/newFolder", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ folderName }),
                });

                if (res.ok) {
                    // Reload UI
                    location.reload();
                } else {
                    const error = await res.json();
                    alert(
                        "Failed to create folder: " +
                            (error.message || "Unknown error")
                    );
                }
            } catch (err) {
                alert("Network error or server unreachable.");
            }
        });
    });
}
