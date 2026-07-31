import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wisconsin Digital Symposium Photo Gallery | UWEBC",
  description:
    "Photo sharing gallery for Wisconsin Digital Symposium still photography, with full-screen viewing and sample social copy.",
  openGraph: {
    title: "Wisconsin Digital Symposium Photo Gallery",
    description:
      "Shareable still photography from the UWEBC Wisconsin Digital Symposium.",
    url: "https://uwebc.wisc.edu/wisconsin-digital-symposium/photos/",
    siteName: "UWEBC",
    images: [
      {
        url: "https://uwebc.wisc.edu/wp-content/uploads/WDS2606-Header2-1600x250.png",
        width: 1600,
        height: 250,
        alt: "Wisconsin Digital Symposium",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://uwebc.wisc.edu/wp-content/themes/uw-theme/dist/fonts/uw-rh/redhat-display-latin.v14.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://uwebc.wisc.edu/wp-content/themes/uw-theme/dist/fonts/uw-rh/redhat-text-latin.v13.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://uwebc.wisc.edu/wp-content/themes/uw-theme/dist/main.min.css?ver=1.39.0"
        />
        <link
          rel="stylesheet"
          href="https://uwebc.wisc.edu/wp-content/themes/uw-uwebc-child-theme/dist/css/styles.css?ver=1.0"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
