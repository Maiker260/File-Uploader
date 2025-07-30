export function renderFileList(
    selectedFiles,
    fileListContainer,
    updateCallback
) {
    fileListContainer.textContent = "";
    selectedFiles.forEach((file, index) => {
        const li = document.createElement("li");
        li.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        li.classList.add("dialog-tool-upload-list");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✖";
        removeBtn.type = "button";
        removeBtn.style.marginLeft = "10px";
        removeBtn.classList.add("dialog-tool-close-btn");

        removeBtn.onclick = () => {
            selectedFiles.splice(index, 1);
            updateCallback();
        };

        li.appendChild(removeBtn);
        fileListContainer.appendChild(li);
    });
}

export function updateInputFiles(selectedFiles, fileInput) {
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach((file) => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;
}
