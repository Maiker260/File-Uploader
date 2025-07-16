import { checkUserDataOnDB } from "../db/queries/check-user-data.js";
import { dialogs } from "../shared/navbar-tools.js";
import { findFolderOnDB } from "../db/queries/find-folder.js";

export function renderIndexWithFolders(getFolderId = () => null) {
    return async function (req, res) {
        const user = req.user;
        const folderId = getFolderId(req);

        let currentFolder = folderId
            ? await findFolderOnDB({ id: folderId })
            : await findFolderOnDB({
                  name: "MyFiles",
                  isDefault: true,
                  parentId: null,
              });

        if (!currentFolder) {
            return res.redirect("/myfiles");
        }

        const { folders } = await checkUserDataOnDB(user.id);
        folders.sort((a, b) => a.name.localeCompare(b.name));

        res.render("index", { user, dialogs, folders, currentFolder });
    };
}
