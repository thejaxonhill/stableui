"use client"

import { TextField, TextFieldProps } from "@mui/material";
import { useMemo } from "react";

export const validateSeed = (value?: string) => !value || Number(value) >= 0 && Number(value) < 4294967294;

type SeedFieldProps = Omit<TextFieldProps, 'value'> & {
    value?: string;
}

const SeedField = ({ value, ...props }: SeedFieldProps) => {

    const isValid = useMemo(() => validateSeed(value), [value]);

    return (
        <TextField
            label="Seed"
            placeholder="0 .. 4294967294"
            error={!isValid}
            helperText={!isValid && "Seed must be between 0 - 4294967294"}
            value={value}
            {...props}
        />
    )
}

export default SeedField;