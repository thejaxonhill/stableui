import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Provider } from "../components/common";
import Navbar from "../components/navbar/Navbar";
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: "Stability UI"
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await getServerSession();
  if (!session)
    redirect("/api/auth/signin");

  return (
    <Provider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <html >
        <body>
          <Navbar session={session} />
          <main style={{ marginLeft: "240px" }}>
            <Container maxWidth='lg' >
              {children}
            </Container>
          </main>
        </body>
      </html>
    </Provider>
  );
}

export default RootLayout;
