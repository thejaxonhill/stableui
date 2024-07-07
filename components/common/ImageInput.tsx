import { Button, ButtonProps } from "@mui/material";

type ImageInputProps = Omit<ButtonProps, 'onChange'> & {
    onChange?: (file: File) => void
}

const ImageInput = ({ children, key, onChange, ...props }: ImageInputProps) =>
    <Button
        component='label'
        variant='contained'
        {...props}>
        <input
            key={key}
            type='file'
            hidden
            accept='image/*'
            onChange={e => {
                const { files } = e.target;
                if (files && files.length > 0 && onChange)
                    onChange(files[0])
            }} />
        {children}
    </Button>

export default ImageInput;