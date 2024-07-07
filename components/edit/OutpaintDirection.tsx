"use client"

import { TextField, TextFieldProps } from "@mui/material";
import { useMemo } from "react";

export const validateOutpaintDirection = (value?: string) => !value || Number(value) >= 0 && Number(value) < 2000;

type OutpaintDirectionProps = Omit<TextFieldProps, 'value'> & {
    value?: string;
    direction: 'left' | 'right' | 'up' | 'down'
}

const OutpaintDirection = ({ direction, value, ...props }: OutpaintDirectionProps) => {
    const isValid = useMemo(() => validateOutpaintDirection(value), [value]);

    return (
        <TextField
            label={direction.charAt(0).toUpperCase() + direction.slice(1, direction.length)}
            placeholder="0 .. 2000"
            error={!isValid}
            helperText={!isValid && "Output direction must be between 0 - 2000"}
            value={value}
            sx={{ flexGrow: 1 }}
            {...props}
        />
    )
}

export default OutpaintDirection;