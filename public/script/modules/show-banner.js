import { getbyId } from "./dom-utils.js";

export function showBanner(messageText, withSpinner = false) {
    const banner = getbyId("banner-notification");
    const bannerSpinner = getbyId("banner-spinner");
    const message = getbyId("banner-message");

    if (withSpinner) {
        bannerSpinner.classList.remove("hidden");
    } else {
        bannerSpinner.classList.add("hidden");
    }

    message.textContent = messageText;
    banner.classList.remove("hidden");
    banner.classList.add("show");

    setTimeout(() => {
        banner.classList.remove("show");
        banner.classList.add("hidden");
    }, 3000);
}
