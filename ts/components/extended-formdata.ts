export class ExtendedFormData extends FormData {
    setIfPresent = (key: string, value?: string | Blob) => {
        if(value)
            this.set(key, value)
    }
}