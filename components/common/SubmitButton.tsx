"use client"

import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { useFormStatus } from "react-dom";

const SubmitButton = (props: Omit<LoadingButtonProps, 'loading | type'>) => {
    const { pending } = useFormStatus();
    return (
        <LoadingButton loading={pending} type="submit" {...props}>
            {props.children}
        </LoadingButton>
    )
}

export default SubmitButton;