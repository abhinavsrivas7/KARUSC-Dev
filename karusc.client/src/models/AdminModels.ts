export type UploadFile = {
    content: string,
    name: string,
    index: number
};

export type ErrorAlert = {
    showErrorAlert: boolean,
    errorAlertDescription: string | null
};