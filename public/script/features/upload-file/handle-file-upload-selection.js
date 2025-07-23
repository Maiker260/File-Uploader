import { getbyId } from "../../modules/dom-utils.js";

let selectedFiles = []; // Persist across dialog open/close

export function handleFileUploadSelection() {
    document.addEventListener("DOMContentLoaded", function () {
        const fileInput = getbyId("uploadFileDialogInput");
        const fileListContainer = getbyId("selectedFilesList");

        // Initial render in case dialog is reopened
        renderFileList();

        fileInput.addEventListener("change", (e) => {
            const newFiles = Array.from(e.target.files);

            newFiles.forEach((file) => {
                const exists = selectedFiles.some(
                    (f) => f.name === file.name && f.size === file.size
                );
                if (!exists) {
                    selectedFiles.push(file);
                }
            });

            renderFileList();
            updateInputFiles();

            // Reset file input so same file can be selected again
            fileInput.value = "";
        });

        function renderFileList() {
            fileListContainer.textContent = "";
            selectedFiles.forEach((file, index) => {
                const li = document.createElement("li");
                li.textContent = `${file.name} (${(file.size / 1024).toFixed(
                    1
                )} KB)`;
                li.classList.add("dialog-tool-upload-list");

                const removeBtn = document.createElement("button");
                removeBtn.textContent = "✖";
                removeBtn.type = "button";
                removeBtn.style.marginLeft = "10px";
                removeBtn.classList.add("dialog-tool-close-btn");
                removeBtn.onclick = () => {
                    selectedFiles.splice(index, 1);
                    renderFileList();
                    updateInputFiles();
                };

                li.appendChild(removeBtn);
                fileListContainer.appendChild(li);
            });
        }

        function updateInputFiles() {
            const dataTransfer = new DataTransfer();
            selectedFiles.forEach((file) => dataTransfer.items.add(file));
            fileInput.files = dataTransfer.files;
            console.log(fileInput.files);
        }
    });
}
