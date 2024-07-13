export const getFilenameWithoutExt = (file: File) => file.name.replace(/\.[^/.]+$/, "");

export const getFileExt = (file: File) => file.name.split('.').pop();