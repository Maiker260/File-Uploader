export const getbyId = (id) => document.getElementById(id);

export const getDialog = (dialogName) => {
    const get = (suffix) => getbyId(`${dialogName}${suffix}`);

    return {
        [`${dialogName}Dialog`]: get("Dialog"),
        [`${dialogName}Btn`]: get("Btn"),
        [`${dialogName}DialogCloseBtn`]: get("DialogCloseBtn"),
        [`${dialogName}DialogCancelBtn`]: get("DialogCancelBtn"),
        [`${dialogName}DialogSubmitBtn`]: get("DialogSubmitBtn"),
        [`${dialogName}DialogInput`]: get("DialogInput"),
    };
};
