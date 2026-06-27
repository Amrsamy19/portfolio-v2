/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Providers } from "./Providers";
import { ClientLayoutWrapper } from "./ClientLayoutWrapper";
import { Cairo, Montserrat } from "next/font/google";
import "../src/index.css";
import "../src/App.css";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "My Portfolio",
  description: "Personal Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cairo.variable} ${montserrat.variable}`}>
      <body>
        <Providers>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
