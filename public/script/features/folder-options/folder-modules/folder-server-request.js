export async function folderServerRequest(dataObject, path, request) {
    try {
        const res = await fetch(`/folders/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: dataObject }),
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
