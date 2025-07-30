import { getbyId } from "../../modules/dom-utils.js";
import { renderFileList, updateInputFiles } from "./files-uploading-list.js";
import { showBanner } from "../../modules/show-banner.js";

export function handleFileUploadSelection() {
    document.addEventListener("DOMContentLoaded", function () {
        const fileInput = getbyId("uploadFileDialogInput");
        const fileListContainer = getbyId("selectedFilesList");
        const submitBtn = getbyId("uploadFileDialogSubmitBtn");
        const folderIdInput = getbyId("folderIdInput");

        let selectedFiles = [];

        const updateUI = () => {
            renderFileList(selectedFiles, fileListContainer, updateUI);
            updateInputFiles(selectedFiles, fileInput);
        };

        updateUI();

        fileInput.addEventListener("change", (e) => {
            const newFiles = Array.from(e.target.files);

            newFiles.forEach((file) => {
                const exists = selectedFiles.some(
                    (f) => f.name === file.name && f.size === file.size
                );
                if (!exists) selectedFiles.push(file);
            });

            updateUI();
            fileInput.value = "";
        });

        submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const folderId = folderIdInput.value;
            if (selectedFiles.length === 0) {
                alert("Please select at least one file to upload.");
                return;
            }

            const formData = new FormData();
            formData.append("folderId", folderId);
            selectedFiles.forEach((file) => {
                formData.append("uploaded_files", file);
            });

            showBanner("Uploading...", true);

            try {
                const res = await fetch("/upload", {
                    method: "POST",
                    body: formData,
                });

                if (res.ok) {
                    window.location.href = `/myfiles/${folderId}`;
                } else {
                    const errorText = await res.text();
                    console.error("Upload failed:", errorText);
                    showBanner("Upload failed. Please try again.");
                }
            } catch (err) {
                console.error("Error uploading:", err);
                showBanner("Unexpected error occurred.");
            }
        });
    });
}
