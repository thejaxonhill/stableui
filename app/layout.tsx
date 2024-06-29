import { Roboto_Mono } from 'next/font/google'
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ApiKeyProvider, GlobalAlertHandler, Provider } from "../components/common";
import Navbar from "../components/navbar/Navbar";
import { cookies } from "next/headers";
import CryptoJs from 'crypto-js';
import CustomThemeProvider from '../components/common/CustomThemeProvider';

const secret = process.env.NEXTAUTH_SECRET!

const roboto = Roboto_Mono({
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
  const cookieStore = cookies();
  const encryptedApiKey = cookieStore.get('external-id')?.value;
  const apiKey = encryptedApiKey
    ? CryptoJs.AES.decrypt(encryptedApiKey, secret).toString(CryptoJs.enc.Utf8)
    : undefined;

  const session = await getServerSession();

  return (
    <Provider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <CustomThemeProvider>
        <html className={roboto.className}>
          <ApiKeyProvider apiKey={apiKey}>
            <body>
              <Navbar session={session} />
              <main >
                <Container maxWidth='lg' sx={{ mb: 5 }}>
                  <GlobalAlertHandler />
                  {children}
                </Container>
              </main>
            </body>
          </ApiKeyProvider>
        </html>
      </CustomThemeProvider>
    </Provider >
  );
}

export default RootLayout;
