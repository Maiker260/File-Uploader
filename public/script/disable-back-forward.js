// Disable Back-Forward Cache
window.addEventListener("pageshow", (event) => {
    const navEntry = performance.getEntriesByType("navigation")[0];

    if (event.persisted || navEntry?.type === "back_forward") {
        window.location.reload();
    }
});
