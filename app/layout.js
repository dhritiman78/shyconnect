import localFont from "next/font/local";
import "./globals.css";
import LoaderWrapper from "@/components/LoaderWrapper"; // 👈 Import wrapper

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "shyConnect",
  description: "Find your perfect match with shyConnect 💖",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoaderWrapper>
          {children}
        </LoaderWrapper>
      </body>
    </html>
  );
}
