export function loadImages() {
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".blur-load .image-view").forEach((img) => {
            if (img.complete) {
                img.parentElement.classList.add("loaded");
            } else {
                img.addEventListener("load", () => {
                    img.parentElement.classList.add("loaded");
                });
            }
        });
    });
}
