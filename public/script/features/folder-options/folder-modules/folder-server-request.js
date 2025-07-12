export async function folderServerRequest(data, path, request) {
    try {
        const res = await fetch(`/folders/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
        });

        if (res.ok) {
            // Reload UI
            location.reload();
        } else {
            const error = await res.json();
            alert(
                `Failed to ${request} folder: ` +
                    (error.message || "Unknown error")
            );
        }
    } catch (err) {
        alert("Network error or server unreachable.");
    }
}
