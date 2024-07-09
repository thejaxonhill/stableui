import { getFilenameWithoutExt } from "../components/file-helpers";
import { OutputFormat } from "../types";

export const checkResponse = (res: Response) => res.ok ? res.blob() : res.json();

export const mapImageToImage = (image: File, outputFormat?: OutputFormat) => 
     mapResponseData(getFilenameWithoutExt(image!) + '.' + outputFormat ?? 'png');

export const mapPromptToImage = (prompt: string, outputFormat?: OutputFormat) => 
    mapResponseData(prompt + '.' + outputFormat ?? 'png');

export const mapResponseData = (filename: string) => (data: any) => data instanceof Blob 
        ? new File([data], filename) 
        : data.errors.reduce((e1: string, e2: string) => e1 + ';' + e2);