export const getFilenameWithoutExt = (file: File) => file.name.replace(/\.[^/.]+$/, "");