import {SessionProvider} from "next-auth/react";
import {AppProps} from "next/app";
import {Fredoka} from "next/font/google";
import '../styles/globals.css'

const fredoka = Fredoka({
  weight: 'variable',
  preload: true,
  subsets: ['latin']
});

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={fredoka.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}