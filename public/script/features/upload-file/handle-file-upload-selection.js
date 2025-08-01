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

        // HAD TO MODIFY THE CODE TO AVOID CHARGES IN AWS WITH S3
        submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const folderId = folderIdInput.value;
            if (selectedFiles.length === 0) {
                alert("Please select at least one file to upload.");
                return;
            }

            showBanner("Uploading...", true, false);

            try {
                for (const file of selectedFiles) {
                    // 1. Ask server for pre-signed URL
                    const urlRes = await fetch("/generate-upload-url", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            filename: file.name,
                            filetype: file.type,
                            filesize: file.size,
                            folderId,
                        }),
                    });

                    if (!urlRes.ok) {
                        const error = await urlRes.json();
                        console.error("Presign error:", error);
                        showBanner(`Upload blocked: ${error.error}`);
                        return;
                    }

                    const { url, key } = await urlRes.json();

                    // 2. Upload the file directly to S3
                    const s3UploadRes = await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": file.type,
                        },
                        body: file,
                    });

                    if (!s3UploadRes.ok) {
                        console.error("S3 upload failed");
                        showBanner("S3 upload failed. Please try again.");
                        return;
                    }

                    // 3. Notify server to store metadata
                    const metaRes = await fetch("/upload/store-file-metadata", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            key,
                            name: file.name,
                            folderId,
                            mimetype: file.type,
                            size: file.size,
                        }),
                    });

                    if (!metaRes.ok) {
                        console.error("Metadata store failed");
                        showBanner("Upload succeeded but saving failed.");
                        return;
                    }
                }

                // 4. Redirect on success
                window.location.href = `/myfiles/${folderId}`;
            } catch (err) {
                console.error("Upload error:", err);
                showBanner("Unexpected error occurred.");
            }
        });
    });
}
