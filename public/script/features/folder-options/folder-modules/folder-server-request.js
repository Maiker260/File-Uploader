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
            let error = { message: "Unknown error" };
            try {
                error = await res.json();
            } catch (e) {
                // Fall back to default error message
            }

            alert(`Failed to ${request} folder: ${error.message}`);
            return;
        }
    } catch (err) {
        alert("Network error or server unreachable.");
    }
}
