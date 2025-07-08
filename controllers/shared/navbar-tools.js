export const dialogs = [
    {
        id: "uploadFile",
        title: "Select Files to Upload",
        inputType: "file",
        isForm: true,
        formMethod: "post",
        formAction: "/upload",
        cancelBtn: "CANCEL",
        submitBtn: "SUBMIT",
    },
    {
        id: "createNewFolder",
        title: "Create Folder",
        inputType: "text",
        isForm: false,
        inputLabel: "Give this folder a name:",
        placeholder: "Folder Name",
        cancelBtn: "CANCEL",
        submitBtn: "CREATE",
    },
];
