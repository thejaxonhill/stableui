"use client"

import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material"
import { AspectRatio } from "../../ts/types"

type AspectRatioSelectProps = Omit<SelectProps, 'value | onChange'> & {
    value?: AspectRatio
    onChange?: (aspectRatio: AspectRatio) => void;
}

const AspectRatioSelect = ({ value, onChange, ...props }: AspectRatioSelectProps) =>
    <FormControl sx={{ minWidth: 120 }}>
        <InputLabel >Aspect Ratio</InputLabel>
        <Select
            label="Aspect Ratio"
            value={value}
            onChange={e => {
                if (onChange)
                    onChange(e.target.value as AspectRatio);
            }}
            {...props}
        >
            {Object.values(AspectRatio).map(k =>
                <MenuItem key={k} value={AspectRatio[k]}>{k}</MenuItem>)
            }
        </Select>
    </FormControl>

export default AspectRatioSelect;