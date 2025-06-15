'use client';
import './globals.css';
import '@mantine/core/styles.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import {
  NextNavigationProgressBar,
  NextNavigationProgressProvider,
} from '@/lib/next-navigation-progress';
import NavigationLink from '@/lib/NavigationLink';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <NextNavigationProgressProvider>
            <ul className="flex gap-4 bg-gray-200 p-4">
              <li>
                <NavigationLink href="/">Home</NavigationLink>
              </li>
              <li>
                <NavigationLink href="/profile">Profile</NavigationLink>
              </li>
              <li>
                <NavigationLink href="/detail">Detail</NavigationLink>
              </li>
            </ul>
            <NextNavigationProgressBar />
            <div className="p-4">{children}</div>
          </NextNavigationProgressProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
