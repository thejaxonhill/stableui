import { Box, Chip, Stack, Typography } from "@mui/material"

type TitleCardProps = {
    creditCost: number;
    title: string;
}

const TitleCard = ({ creditCost, title }: TitleCardProps) =>
    <Stack spacing={{ xs: 2, sm: 1 }}
        direction={{ xs: 'column', sm: 'row' }}
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 3 }}>
        <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
            {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip label={String(creditCost) + " credits"} variant="outlined" />
        </Box>
    </Stack>

export default TitleCard;