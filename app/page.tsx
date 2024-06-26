import { Box, Button, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Stable UI - Home'
}

const Home = async () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Stack direction='column' spacing={2}>
        <Typography variant="h2" textAlign='center'>
          Welcome to Stable UI
        </Typography>
        <Typography variant="h4" textAlign='center' color='primary'>
          A free and open source tool for interacting with {
            <Link href='https://stability.ai/' style={{ color: 'inherit' }} target="_blank" rel="noreferrer">
              Stability API
            </Link>
          }
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Button size="large" variant="contained" LinkComponent={Link} href="/generate/sd3">
          Get Started
        </Button>
      </Box>
    </Box>
  )
}

export default Home;