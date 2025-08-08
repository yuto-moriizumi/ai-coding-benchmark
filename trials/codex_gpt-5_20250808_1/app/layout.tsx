export const metadata = {
  title: "Blog App",
  description: "Simple blog with comments",
};

import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: 20 }}>
        {children}
      </body>
    </html>
  );
}
