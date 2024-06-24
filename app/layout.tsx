import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ApiKeyProvider, GlobalAlertHandler, Provider } from "../components/common";
import Navbar from "../components/navbar/Navbar";
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import CryptoJs from 'crypto-js';
import CustomThemeProvider from '../components/common/CustomThemeProvider';

const secret = process.env.NEXTAUTH_SECRET!

export const metadata: Metadata = {
  title: "Stability UI"
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = cookies();
  const encryptedApiKey = cookieStore.get('apiKey')?.value;
  const apiKey = encryptedApiKey
    ? CryptoJs.AES.decrypt(encryptedApiKey, secret).toString(CryptoJs.enc.Utf8)
    : undefined;

  console.log(apiKey)
  const session = await getServerSession();
  // if (!session)
  //   redirect("/auth/signin");

  return (
    <Provider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <CustomThemeProvider>
        <ApiKeyProvider apiKey={apiKey}>
          <html >
            <body>
              <Navbar session={session} />
              <main >
                <Container maxWidth='lg' >
                  <GlobalAlertHandler />
                  {children}
                </Container>
              </main>
            </body>
          </html>
        </ApiKeyProvider>
      </CustomThemeProvider>
    </Provider>
  );
}

export default RootLayout;
