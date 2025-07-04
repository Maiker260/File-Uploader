const getbyId = (id) => document.getElementById(id);

const { arrow, userInfo } = {
    arrow: getbyId("arrow"),
    userInfo: getbyId("userInfo"),
};

function setupToggleDialog(triggerBtn, sidebar, extraToggleClass = null) {
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

setupToggleDialog(userInfo, arrow, "rotated");
// NEED TO REPLACE WHEN THE SIDEBAR EXISTS
// setupToggleDialog(userInfo, sidebar, "rotated");
