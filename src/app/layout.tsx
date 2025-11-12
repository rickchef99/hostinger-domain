import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';

import { SWRProvider } from '@/context/swr-provider';

import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `TypeScript starter for Next.js by João Pedro Schmitz`,
  description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SWRProvider>{children}</SWRProvider>
        <Toaster />
      </body>
    </html>
  );
}
