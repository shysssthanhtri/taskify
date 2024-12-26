import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { AuthGuard } from "@/components/common/auth-guard";
import { PayLayout } from "@/components/common/page-layout";
import { ThemeProvider } from "@/components/common/theme-provider";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={cn(GeistSans.className, "font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthGuard>
            <PayLayout>
              <Component {...pageProps} />
            </PayLayout>
          </AuthGuard>
        </ThemeProvider>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
