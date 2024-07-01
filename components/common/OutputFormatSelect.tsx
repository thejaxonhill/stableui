"use client"

import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material"
import { OutputFormat } from "../../ts/types";

type OutputFormatSelectProps = Omit<SelectProps, 'value | onChange'> & {
    value?: OutputFormat
    onChange?: (outputFormat: OutputFormat) => void;
}

const OutputFormatSelect = ({ value, onChange, ...props }: OutputFormatSelectProps) => {
    return (
        <FormControl sx={{ minWidth: 125 }}>
            <InputLabel >Output format</InputLabel>
            <Select
                value={value}
                label="Output format"
                onChange={e => {
                    if (onChange)
                        onChange(e.target.value as OutputFormat);
                }}
                {...props}
            >
                {Object.values(OutputFormat).map(k =>
                    <MenuItem key={k} value={k}>{k}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default OutputFormatSelect;