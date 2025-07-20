export function transformFileDate() {
    document.querySelectorAll(".upload-time").forEach((span) => {
        const isoTime = span.dataset.time;
        const date = new Date(isoTime);

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
        };

        span.textContent = new Intl.DateTimeFormat(undefined, options).format(
            date
        );
    });
}
