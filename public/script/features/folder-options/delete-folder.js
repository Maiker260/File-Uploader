import { folderServerRequest } from "./folder-modules/folder-server-request.js";

export async function deleteFolder(folderId) {
    await folderServerRequest({ folderId }, "deleteFolder", "delete");
}
