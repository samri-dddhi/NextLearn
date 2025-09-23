'use client'
import { Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from './utils/theme-provider';
import { Toaster } from "react-hot-toast";
import {Providers} from './Provider'
import {SessionProvider} from 'next-auth/react'
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [ "400", "500", "600", "700"],
});
const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: [ "400", "500", "600", "700"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
       <Providers>
        <SessionProvider>
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Custom>{children}</Custom>
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
       </SessionProvider>
       </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery({});
  return (
  <>
  {
    isLoading ? <Loader /> : <>{children}</>
  }
</>
  )
} 