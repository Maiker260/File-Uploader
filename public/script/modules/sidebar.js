export function setupToggleSidebar(
    triggerBtn,
    sidebar,
    extraToggleClass = null
) {
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
