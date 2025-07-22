import { getbyId } from "../../modules/dom-utils.js";

export function showCopyBanner(messageText) {
    const banner = getbyId("banner-notification");
    const message = getbyId("banner-message");

    message.textContent = messageText;
    banner.classList.remove("hidden");
    banner.classList.add("show");

    setTimeout(() => {
        banner.classList.remove("show");
        banner.classList.add("hidden");
    }, 2000);
}
