import { Roboto, Roboto_Mono } from 'next/font/google'
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { ApiKeyDialog, GlobalAlertHandler, Provider } from "../components/common";
import Navbar from "../components/navbar/Navbar";
import { cookies } from "next/headers";
import CustomThemeProvider from '../components/common/CustomThemeProvider';
import { auth } from '@/auth';

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const roboto = Roboto({
  weight: ['500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Stability UI",
  icons: {
    icon: '/icon.png',
  }
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const hasKey = cookies().has('external-id');
  const session = await auth();

  return (
    <Provider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <CustomThemeProvider>
        <html className={robotoMono.className} >
          <ApiKeyDialog hasKey={hasKey} />
          <body>
            <Navbar session={session} />
            <main >
              <Container maxWidth='lg' sx={{ mb: 5 }}>
                <GlobalAlertHandler />
                {children}
              </Container>
            </main>
          </body>
        </html>
      </CustomThemeProvider>
    </Provider >
  );
}

export default RootLayout;
