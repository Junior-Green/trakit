import {Fredoka} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";

const fredoka = Fredoka({
    weight: 'variable',
    preload: true,
    subsets: ['latin']
});

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={fredoka.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
