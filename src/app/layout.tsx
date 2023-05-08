import {Fredoka} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";

export const metadata = {
    title: {
        default: 'TrakIt',
        absolute: 'TrakIt'
    },
    generator: 'Next.js',
    applicationName: 'TrakIt',
    authors: [{name: 'Junior'}],
    colorScheme: 'dark',
    creator: 'Junior Green',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
}

const fredoka = Fredoka({
    weight: 'variable',
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
