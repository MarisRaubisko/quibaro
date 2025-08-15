import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import cn from "classnames";
import "@/assets/styles/scrollbar.css";
import "@/assets/styles/range-slider.css";
import "@/assets/styles/globals.css";

import { QueryClientProvider } from "@/components/shared/query-client-provider";
import { Suspense } from "react";

import ModalsContainer from "@/components/modal-views/container";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { ToasterProvider } from "@/components/toaster/ToasterProvider";
import { auth } from "@clerk/nextjs/server";
import { getUserGenerations } from "@/utils/server";
import TopNav from "@/components/TopNav";
import { GoogleAnalytics } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
// import { ClerkThemeProvider } from "@/components/layouts/clerk-theme-provider/clerk-theme-provider";

import Footer from "@/components/ui/footer";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vision Engine AI - Bringing Your Imagination to Life",
  description:
    "Vision Engine AI turns your creative ideas into stunning images with advanced AI. Bring your fantasies to life easily - try it today!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  let generations = undefined;

  if (userId) {
    generations = await getUserGenerations();
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark as any,
        variables: {
          colorBackground: "#0d0d0d",
          colorInputBackground: "#0d0d0d",
        },
      }}
    >
      <html
        lang="en"
        dir="ltr"
        suppressHydrationWarning
        className={cn(poppins.className, "")}
      >
        <head>
          {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 maximum-scale=1"
          />
        </head>
        <body>
          <ThemeProvider>
            <ToasterProvider />
            <QueryClientProvider>
              <NextTopLoader color="#323743" showSpinner={false} />
              <Suspense fallback={null}>
                <ModalsContainer />
              </Suspense>
              <TopNav generations={generations} />
              <main className="min-h-[calc(100vh-96px)] flex flex-col justify-between">
                <div className="px-4 pt-4 sm:px-6 lg:px-8 3xl:px-10 flex flex-col flex-1">
                  {children}
                </div>
                <Footer />
              </main>
            </QueryClientProvider>
          </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-3YB0YXFFH1" />
      </html>
    </ClerkProvider>
  );
}
