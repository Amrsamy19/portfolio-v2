import { Providers } from "./Providers";
import "../src/index.css";
import "../src/App.css";

export const metadata = {
  title: "My Portfolio",
  description: "Personal Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
