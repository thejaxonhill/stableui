"use client"

import { TextField, TextFieldProps } from "@mui/material";
import { useMemo } from "react";

export const validatePrompt = (value?: string) => !value || value.length < 10000;

type PromptFieldProps = Omit<TextFieldProps, 'value'> & {
    value?: string;
}

const PromptField = ({ value, ...props }: PromptFieldProps) => {

    const isValid = useMemo(() => validatePrompt(value), [value]);

    return (
        <TextField
            fullWidth
            error={!isValid}
            helperText={!isValid && 'Prompt must be less than 10,000 characters'}
            value={value}
            {...props}
        />
    )
}

export default PromptField;