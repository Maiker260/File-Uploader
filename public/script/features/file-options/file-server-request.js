export async function fileServerRequest(data, request) {
    try {
        const res = await fetch("/file/delete", {
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

            alert(`Failed to ${request} file: ${error.message}`);
            return;
        }
    } catch (err) {
        alert("Network error or server unreachable.");
    }
}
